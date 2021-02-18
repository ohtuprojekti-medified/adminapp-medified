'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_care_giver_activities extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_care_giver_activities.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_care_giver_id: DataTypes.BIGINT
  }, {
    timestamps: false,
    sequelize,
    modelName: 'user_care_giver_activities',
  })
  return user_care_giver_activities
}

