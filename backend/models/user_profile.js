'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_profile extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_profile.init({
    user_id: DataTypes.STRING,
    height: DataTypes.DOUBLE,
    weight: DataTypes.DOUBLE,
    sex: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    added_organisation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_profile',
  })
  return user_profile
}