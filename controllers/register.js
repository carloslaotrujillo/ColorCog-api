import bcrypt from "bcrypt";
// import { User } from "../models/user.js";

const SALT_ROUNDS = 10;

export const handleRegister = (db) => async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json("Incorrect form submission");
	}

	const hash = bcrypt.hashSync(password, SALT_ROUNDS);

	const newUser = await User.create({ name: name, email: email, password: hash });
	console.log(newUser);

	res.send("User created!");
};
