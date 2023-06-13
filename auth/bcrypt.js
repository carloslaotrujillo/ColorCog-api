const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALT_ROUNDS);

function hashPassword(password) {
	return bcrypt.hashSync(password, saltRounds);
}

function checkPassword(password, hash) {
	return bcrypt.compare(password, hash);
}

module.exports = {
	hashPassword,
	checkPassword,
};
