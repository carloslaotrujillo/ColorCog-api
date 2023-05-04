import usersDatabase from "./usersDatabase.js";
import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("It Works!");
});

app.post("/signin", (req, res) => {
	console.log(req.body);
	res.send("Success Signin!");
});

app.listen(port, () => {
	console.log("Server is running on port 3000");
});
