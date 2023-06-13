const { DataTypes } = require("sequelize");
const db = require("../db/db.js");

const Color = db.define(
	"Color",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Users",
				key: "id",
			},
		},
		hex_color: {
			type: DataTypes.STRING,
		},
		name_color: {
			type: DataTypes.STRING,
		},
		entries: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

module.exports = Color;
