'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_professional_profiles extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_professional_profiles.init({
    professional_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    name: DataTypes.STRING,
    profession: DataTypes.STRING,
    workplace: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'user_professional_profiles',
  })
  return user_professional_profiles
}