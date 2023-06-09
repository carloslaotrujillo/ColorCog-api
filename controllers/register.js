const bcrypt = require("bcrypt");
const db = require("../db");
const User = require("../models/user");

const handleRegister = () => async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ error: "Incorrect form submission" });
	}

	const hash = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

	try {
		const result = await db.transaction(async (t) => {
			const user = await User.create(
				{
					name: name,
					email: email,
					password: hash,
				},
				{ transaction: t }
			);
			res.status(200).json(user.id);
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while registering in." });
	}
};

module.exports = { handleRegister };
