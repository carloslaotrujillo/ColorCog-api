// INIT
if (process.env.NODE_ENV === "development") {
	require("dotenv").config();
}

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const jwtStrategy = require("./auth/strategies");
const { Sequelize } = require("sequelize");

const app = express();
const db = require("./db/db");
const appRouter = require("./routes");

const User = require("./models/user");
const Color = require("./models/color");

// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

passport.use(jwtStrategy);

// ROUTES
app.use("/", appRouter);
app.use((req, res, next) => {
	res.status(404).json({ message: "404 Not found." });
});
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "500 Internal server error." });
});

// SERVER
(async () => {
	try {
		await db.authenticate();
		console.log("\n=== DB Connection has been established successfully ===");

		await User.sync();
		await Color.sync();

		app.listen(process.env.APP_PORT, () => {
			console.log("=== Server running on port " + process.env.APP_PORT + " ===");
		});
	} catch (error) {
		console.error("\nUnable to connect to the database:", error);
	}
})();
