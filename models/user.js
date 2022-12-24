"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsToMany(models.Company, {
				through: models.UserCourse,
				foreignKey: "user_id",
			});
			User.belongsToMany(models.Course, {
				through: models.UserCourse,
				foreignKey: "user_id",
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			age: DataTypes.INTEGER,
			address: DataTypes.STRING,
			gender: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
