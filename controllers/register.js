const db = require("../db/db");
const User = require("../models/user");
const { hashPassword } = require("../auth/bcrypt");
const { generateToken } = require("../auth/jwt");

var token;
// const setCookie = (res, jwt) => {
// 	res.cookie("token", jwt, {
// 		secure: true,
// 		httpOnly: true,
// 		sameSite: "lax",
// 	});	
// };

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

		token = await generateToken({ user_id: user.id });

		console.log(token)
		
		// ====================== REDO THIS WHOLE FILEEEEEE

		await fetch("/setcookie", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token: token }),
		});			

		
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "2An error occurred while registering in." });
	}
};

module.exports = { handleRegister };
