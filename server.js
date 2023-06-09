// INIT
if (process.env.NODE_ENV === "development") {
	require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const colors = require("./controllers/color");

const app = express();
const db = require("./db");

const User = require("./models/user");
const Color = require("./models/color");

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("common"));

// ROUTES
app.get("/users", async (req, res) => {
	const users = await User.findAll();
	res.status(200).json(users);
});

app.get("/colors", async (req, res) => {
	const colors = await Color.findAll();
	res.status(200).json(colors);
});

app.get("/profile/:id", profile.handleProfile());

app.post("/signin", signin.handleSignin());

app.post("/register", register.handleRegister());

app.post("/url", colors.getColorsFromUrl());

app.post("/file", colors.getColorsFromFile());

// SERVER
(async () => {
	try {
		await db.authenticate();
		console.log("\nConnection has been established successfully.\n");

		await User.sync();
		await Color.sync();

		app.listen(process.env.APP_PORT, () => {
			console.log("\nServer running on port " + process.env.APP_PORT);
		});
	} catch (error) {
		console.error("\nUnable to connect to the database:", error);
	}
})();
