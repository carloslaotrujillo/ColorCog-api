import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Sequelize } from "sequelize";

// import db from "./db.js";
import { User } from "./models/user.js";

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
app.use(morgan("common"));

// ROUTES
app.get("/", (req, res) => {
	res.send("It Works!");
});

// DB
const db = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	logging: console.log,
});

app.get("/profile/:id", handleProfile(db));

app.post("/signin", handleSignin(db));

app.post("/register", handleRegister(db));

app.post("/url", getColorsFromUrl(db));

app.post("/file", getColorsFromFile(db));

// SERVER
(async () => {
	try {
		await db.authenticate();
		console.log("Connection has been established successfully.");

		// await User.sync();

		app.listen(process.env.APP_PORT, () => {
			console.log("\n Server running on port " + process.env.APP_PORT);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

// app.listen(process.env.APP_PORT, () => {
// 	console.log("\n Server running on port " + process.env.APP_PORT);
// });
