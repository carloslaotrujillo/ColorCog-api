const db = require("../db");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const handleRegister = () => async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: "Incorrect form submission" });
	}

	var userId;

	try {
		const result = await db.transaction(async (t) => {
			const userSearch = await User.findOne({
				where: {
					email: email,
				},
				t,
			});

			if (userSearch) {
				return res.status(400).json({ message: "User already exists" });
			}

			const hash = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
			const user = await User.create(
				{
					name: name,
					email: email,
					password: hash,
				},
				{ transaction: t }
			);
			userId = user.id;
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while registering in." });
	}

	console.log(userId);
	res.cookie("userId", userId);
	res.status(200).json({ message: "Success" });
};

module.exports = { handleRegister };
