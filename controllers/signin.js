const bcrypt = require("bcrypt");

const db = require("../db");
const User = require("../models/user");

const handleSignin = () => async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Incorrect form submission" });
	}

	try {
		const result = await db.transaction(async (t) => {
			const user = await User.findOne({ where: { email: email }, t });

			if (!user) {
				return res.status(400).json({ error: "Incorrect email or password" });
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				return res.status(400).json({ error: "Incorrect email or password" });
			}

			res.status(200).cookie("user", user.id, { secure: true, httpOnly: true }).json("Success");
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while signing in." });
	}
};

module.exports = { handleSignin };
