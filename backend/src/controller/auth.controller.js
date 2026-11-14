import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

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
