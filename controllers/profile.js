const User = require("../models/user");
const Color = require("../models/color");

const handleProfile = () => async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		const colors = await Color.findAll({ where: { user_id: id } });

		res.status(200).json({ user: user, colors: colors });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while getting the user." });
	}
};

module.exports = { handleProfile };
