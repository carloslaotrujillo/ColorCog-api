const User = require("../models/user");
const Color = require("../models/color");

const getColors = () => async (req, res) => {
	const user_id = req.cookies.user;
	if (!user_id) {
		return res.status(400).json({ error: "User ID not found" });
	}

	const { type, name_color, hex_color } = req.body;

	try {
		const user = await User.findByPk(user_id);

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		// IF TYPE IS URL THEN GET COLORS FROM URL
		// IF TYPE IS FILE THEN GET COLORS FROM FILE

		const colors = await Color.create({ type: type, name_color: name_color, hex_color: hex_color, user_id: user_id });

		res.status(200).json("Success");
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while getting the colors." });
	}
};

const getColorsFromFile = () => (req, res) => {
	res.send("Get Colors From File");
};

module.exports = { getColors };
