'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class access_codes extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  access_codes.init({
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'access_codes',
  })
  return access_codes
}
