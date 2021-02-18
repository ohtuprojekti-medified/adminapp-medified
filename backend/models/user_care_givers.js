'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_care_givers extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_care_givers.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    access_code_id: DataTypes.STRING,
    consent: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    sequelize,
    modelName: 'user_care_givers',
  })
  return user_care_givers
}
