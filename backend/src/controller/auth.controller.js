import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const id = req.auth?.userId || req.body.id;
		const { firstName, lastName, imageUrl } = req.body;

		if (!id) {
			return res.status(400).json({ message: "User ID is required" });
		}

		// check if user already exists
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// signup
			const computedName = `${firstName || ""} ${lastName || ""}`.trim();
			await User.create({
				clerkId: id,
				fullName: computedName || "Cosmic Listener",
				imageUrl: imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=aurora",
			});
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};
