const crypto = require("crypto");

function generateSecretKey(length) {
	return crypto.randomBytes(length).toString("hex");
}

console.log(generateSecretKey(64)); // Generate a 128-character secret key
