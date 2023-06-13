const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRE;

const generateToken = (payload) => {
	return jwt.sign(payload, secret, { expiresIn: expires });
};

const verifyToken = (token) => {
	return jwt.verify(token, secret);
};

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["jwt"];
	}
	return token;
};

module.exports = {
	verifyToken,
	generateToken,
	cookieExtractor,
};
