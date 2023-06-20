const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRE;

const generateToken = (payload) => {
	return jwt.sign(payload, secret, { expiresIn: expires });
};

const verifyToken = (token) => {
	return jwt.verify(token, secret);
};

const setCookie = (res, jwt) => {
	res.cookie("token", jwt, {
		secure: true,
		httpOnly: true,
		sameSite: "strict",
	});
};

module.exports = {
	verifyToken,
	generateToken,
	setCookie,
};
