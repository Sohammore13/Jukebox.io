import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
	const allowedOrigins = [
		process.env.CLIENT_URL,
		"http://localhost:5173",
		"http://localhost:3000",
	].filter(Boolean);

	const io = new Server(server, {
		cors: {
			origin: allowedOrigins,
			credentials: true,
		},
	});

	const userSockets = new Map(); // { userId: Set<socketId> }
	const userActivities = new Map(); // { userId: activity }

	io.on("connection", (socket) => {
		let currentUserId = socket.handshake.auth?.userId;

		socket.on("user_connected", (userId) => {
			if (!userId) return;
			currentUserId = userId;
			socket.userId = userId;

			if (!userSockets.has(userId)) {
				userSockets.set(userId, new Set());
			}
			userSockets.get(userId).add(socket.id);
			socket.join(userId);

			if (!userActivities.has(userId)) {
				userActivities.set(userId, "Idle");
			}

			// broadcast to all connected sockets that this user is online
			io.emit("user_connected", userId);
			socket.emit("users_online", Array.from(userSockets.keys()));
			io.emit("activities", Array.from(userActivities.entries()));
		});

		socket.on("update_activity", ({ userId, activity }) => {
			const targetUserId = socket.userId || userId;
			if (!targetUserId) return;
			userActivities.set(targetUserId, activity);
			io.emit("activity_updated", { userId: targetUserId, activity });
		});

		socket.on("send_message", async (data) => {
			try {
				const { receiverId, content } = data;
				const senderId = socket.userId || data.senderId;

				if (!senderId || !receiverId || !content?.trim()) {
					return socket.emit("message_error", "Missing required message fields");
				}

				const message = await Message.create({
					senderId,
					receiverId,
					content: content.trim(),
				});

				// send to all receiver sockets in their user room
				io.to(receiverId).emit("receive_message", message);

				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);
			}
		});

		socket.on("disconnect", () => {
			const userId = socket.userId || currentUserId;
			if (userId && userSockets.has(userId)) {
				const sockets = userSockets.get(userId);
				sockets.delete(socket.id);
				if (sockets.size === 0) {
					userSockets.delete(userId);
					userActivities.delete(userId);
					io.emit("user_disconnected", userId);
				}
			}
		});
	});
};
