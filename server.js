import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";

import { handleSignin } from "./controllers/signin.js";
import { handleRegister } from "./controllers/register.js";
import { handleProfile } from "./controllers/profile.js";
import { getColorsFromUrl } from "./controllers/color.js";
import { getColorsFromFile } from "./controllers/color.js";

// INIT
if (process.env.NODE_ENV === "development") {
	dotenv.config();
}

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DB CONNECTION
const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

// ROUTES
app.get("/", (req, res) => {
	res.send("It Works!");
});

app.get("/profile/:id", (req, res) => {
	handleProfile(req, res, sequelize);
});

app.post("/signin", (req, res) => {
	handleSignin(req, res, sequelize, bcrypt);
});

app.post("/register", (req, res) => {
	handleRegister(req, res, sequelize, bcrypt);
});

app.post("/url", (req, res) => {
	getColorsFromUrl(req, res, sequelize);
});

app.post("/file", (req, res) => {
	getColorsFromFile(req, res, sequelize);
});

// SERVER
app.listen(process.env.APP_PORT, () => {
	console.log("Server running on port " + process.env.APP_PORT);
});
