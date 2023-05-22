import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";

// INIT
if (process.env.NODE_ENV === "development") {
	dotenv.config();
}
const app = express();
const SALT_ROUNDS = 10;

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

app.post("/signin", (req, res) => {
	const { username, password } = req.body;
	const hash = bcrypt.hashSync(password, SALT_ROUNDS);
	console.log(password);
	console.log(hash);
	res.send("Sign In");
});

// LISTEN
app.listen(process.env.APP_PORT, () => {
	console.log("Server running on port " + process.env.APP_PORT);
});
