// INIT
if (process.env.NODE_ENV === "development") {
	require("dotenv").config();
}

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { Sequelize } = require("sequelize");
const cookieParser = require("cookie-parser");

const colors = require("./controllers/color");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const register = require("./controllers/register");

const app = express();
const db = require("./db");

const User = require("./models/user");
const Color = require("./models/color");

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

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

app.post("/color", colors.getColors());

// SERVER
(async () => {
	try {
		await db.authenticate();
		console.log("\nConnection has been established successfully.");

		await User.sync();
		await Color.sync();

		app.listen(process.env.APP_PORT, () => {
			console.log("\nServer running on port " + process.env.APP_PORT);
		});
	} catch (error) {
		console.error("\nUnable to connect to the database:", error);
	}
})();
