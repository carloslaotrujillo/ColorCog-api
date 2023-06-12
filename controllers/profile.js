const db = require("../db");
const User = require("../models/user");
const Color = require("../models/color");

const handleProfile = () => async (req, res) => {
	const client_user_id = req.cookies.user;
	if (!client_user_id) {
		return res.status(400).json({ message: "ID not found" });
	}

	try {
		const result = await db.transaction(async (t) => {
			const user = await User.findByPk(client_user_id, { transaction: t });

			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}

			const colors = await Color.findAll({ where: { user_id: client_user_id } }, { transaction: t });

			res.status(200).json({ user: user, colors: colors });
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while getting the user." });
	}
};

module.exports = { handleProfile };
