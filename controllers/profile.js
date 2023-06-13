const db = require("../db/db");
const User = require("../models/user");
const Color = require("../models/color");

const handleProfile = () => async (req, res) => {
	const { user_id } = req.body;

	try {
		const result = await db.transaction(async (t) => {
			const user = await User.findByPk(user_id, { transaction: t });

			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}

			const colors = await Color.findAll({ where: { user_id: user_id } }, { transaction: t });

			res.status(200).json({ user: user, colors: colors });
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while getting the user." });
	}
};

module.exports = { handleProfile };
