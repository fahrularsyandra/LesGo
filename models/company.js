'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Company.hasMany(models.Course, {
                foreignKey: 'company_id'
            })
            Company.belongsToMany(models.User, { through: models.UserCourse })
        }
        toJSON() {
            return {...this.get(), id: undefined }
        }
    }
    Company.init({
        name: DataTypes.STRING,
        no_telp: DataTypes.INTEGER,
        address: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Company',
    });
    return Company;
};