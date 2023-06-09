const { Sequelize } = require("sequelize");

const db = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	logging: console.log,
});

module.exports = db;
