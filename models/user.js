'use strict';
const {
    Model
} = require('sequelize');
const usercourse = require('./usercourse');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsToMany(models.Company, { as: "Company", through: models.UserCourse })
            User.belongsToMany(models.Course, { as: "Course", through: models.UserCourse })
        }
        toJSON() {
            return {...this.get(), id: undefined }
        }
    }
    User.init({
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        address: DataTypes.STRING,
        gender: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};