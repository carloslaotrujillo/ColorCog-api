import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export const handleSignin = (db) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json("incorrect form submission");
	}

	const hash = bcrypt.hashSync(password, SALT_ROUNDS);

	console.log(email);
	console.log(password);
	console.log(hash);

	res.send("Sign In");
};
