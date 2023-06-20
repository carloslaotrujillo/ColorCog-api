const db = require("../db/db");
const User = require("../models/user");
const { hashPassword } = require("../auth/bcrypt");
const { generateToken, setCookie } = require("../auth/jwt");

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

		const registeredUser = await db.transaction(async (t) => {
			const hash =  await hashPassword(password);
			const user = await User.create(
				{
					name: name,
					email: email,
					password: hash,
				},
				{ transaction: t }
			);		

			return user;
		});		
		
		const token = await generateToken({ user_id: registeredUser.id });
		
		setCookie(res, token);
		
		res.status(200).json({ message: "User registered successfully" })
		
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while registering in." });
	}
};

module.exports = { handleRegister };
