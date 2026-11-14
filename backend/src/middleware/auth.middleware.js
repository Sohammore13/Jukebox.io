import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	if (!req.auth?.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		if (!req.auth?.userId) {
			return res.status(401).json({ message: "Unauthorized - you must be logged in" });
		}

		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const adminEmails = (process.env.ADMIN_EMAIL || "").split(",").map((e) => e.trim().toLowerCase());
		const userEmail = currentUser.primaryEmailAddress?.emailAddress?.toLowerCase();

		const isAdmin = (userEmail && adminEmails.includes(userEmail)) || currentUser.publicMetadata?.role === "admin";

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
		next(error);
	}
};
