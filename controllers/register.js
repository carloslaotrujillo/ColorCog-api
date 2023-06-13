const db = require("../db/db");
const User = require("../models/user");
const { hashPassword } = require("../auth/bcrypt");
const { generateToken } = require("../auth/jwt");

const handleRegister = () => async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: "Incorrect form submission" });
	}

	try {
		const userSearch = await User.findOne({ where: { email: email } });

		if (userSearch) {
			return res.status(400).json({ message: "User already exists" });
		}

		const transaction = await db.transaction();

		try {
			const hash = hashPassword(password);
			const user = await User.create(
				{
					name: name,
					email: email,
					password: hash,
				},
				{ transaction: transaction }
			);

			await transaction.commit();

			const token = await generateToken({ user_id: user.id });
			res.cookie("token", token); // set cookie correctly

			return res.status(200).json({ message: "Success" });
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while registering in." });
	}
};

module.exports = { handleRegister };
