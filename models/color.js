// import DataTypes from "sequelize";

// export const defineColors = (db) => {
// 	db.define(
// 		"Color",
// 		{
// 			id: {
// 				type: DataTypes.UUID,
// 				defaultValue: DataTypes.UUIDV4,
// 				allowNull: false,
// 				primaryKey: true,
// 				unique: true,
// 			},
// 			userID: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: "Users",
// 					key: "id",
// 				},
// 			},
// 			hex_color: {
// 				type: DataTypes.STRING,
// 			},
// 			name_color: {
// 				type: DataTypes.STRING,
// 			},
// 		},
// 		{
// 			// Other model options go here
// 		}
// 	);
// };
