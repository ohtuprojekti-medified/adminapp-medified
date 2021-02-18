'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class organisations extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  organisations.init({
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    primary_color: DataTypes.STRING,
    primary_bg_color: DataTypes.STRING,
    secondary_color: DataTypes.STRING,
    secondary_bg_color: DataTypes.STRING,
    action_color: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'organisations',
  })
  return organisations
}

