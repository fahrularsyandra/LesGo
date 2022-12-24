'use strict';
const {
    Model
} = require('sequelize');
const company = require('./company');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
			/**
			 * Helper method for defining associations.
			 * This method is not a part of Sequelize lifecycle.
			 * The `models/index` file will call this method automatically.
			 */
			static associate(models) {
				// define association here
				Course.belongsTo(models.Company, {
					foreignKey: "company_id",
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
				});

				Course.belongsToMany(models.User, {
					through: models.UserCourse,
					foreignKey: "course_id",
				});
			}
			toJSON() {
				return { ...this.get(), id: undefined };
			}
		}
		Course.init(
			{
				name: DataTypes.STRING,
				company_id: DataTypes.INTEGER,
				price: DataTypes.BIGINT,
				duration: DataTypes.INTEGER,
			},
			{
				sequelize,
				modelName: "Course",
			},
		);
    return Course;
};