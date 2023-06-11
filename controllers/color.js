const fs = require("fs");
const db = require("../db");
const path = require("path");
const fetch = require("node-fetch");

const User = require("../models/user");
const Color = require("../models/color");
const { fetchOptions } = require("./utils/colorUtils");

const getUrlColorsFromAI = () => async (req, res) => {
	// const client_user_id = req.cookies.user;
	// if (!client_user_id) {
	// 	return res.status(400).json({ error: "ID not found" });
	// }
	const { src } = req.body;

	try {
		const data = await fetch(process.env.API_URL + process.env.MODEL_ID + "/outputs", fetchOptions("url", src));
		const result = await data.json();
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error fetching colors." });
	}
};

const getFileColorsFromAI = () => async (req, res, next) => {
	// const client_user_id = req.cookies.user;
	// if (!client_user_id) {
	// 	return res.status(400).json({ error: "ID not found" });
	// }
	const filePath = req.file.path;
	const base64Image = fs.readFileSync(path.join(process.cwd(), filePath)).toString("base64");

	try {
		const data = await fetch(
			process.env.API_URL + process.env.MODEL_ID + "/outputs",
			fetchOptions("base64", base64Image)
		);
		const result = await data.json();
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error fetching colors." });
	}
};

const upsertColor = () => async (req, res) => {
	const client_user_id = req.cookies.user;
	if (!client_user_id) {
		return res.status(400).json({ error: "ID not found" });
	}

	const { type, name_color, hex_color } = req.body;

	try {
		const result = await db.transaction(async (t) => {
			const user = await User.findByPk(client_user_id, { transaction: t });

			if (!user) {
				return res.status(400).json({ error: "User not found" });
			}

			const colorSearch = await Color.findOne({
				where: {
					user_id: user.id,
					hex_color: hex_color,
				},
				t,
			});

			if (colorSearch) {
				colorSearch.entries += 1;
				await colorSearch.save({ transaction: t });
			} else {
				const colors = await Color.create(
					{
						type: type,
						name_color: name_color,
						hex_color: hex_color,
						user_id: client_user_id,
					},
					{ transaction: t }
				);
			}

			user.entries += 1;
			await user.save({ transaction: t });

			res.status(200).json("Success");
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while upsert the color." });
	}
};

module.exports = {
	upsertColor: upsertColor,
	getUrlColorsFromAI: getUrlColorsFromAI,
	getFileColorsFromAI: getFileColorsFromAI,
};
