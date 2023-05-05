import express from "express";
import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
import cors from "cors";

if (process.env.NODE_ENV === "development") {
	dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("It Works!");
});

app.post("/signin", (req, res) => {
	console.log(req.body);
	res.send("Success Signin!");
});

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

const [results, metadata] = await sequelize.query("SELECT * from users");
console.log(results);

app.listen(process.env.APP_PORT, () => {
	console.log("Server is running on port 3000");
});
