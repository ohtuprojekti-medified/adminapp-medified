'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_survey_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_survey_answer.init({
    user_id: DataTypes.STRING,
    survey_id: DataTypes.STRING,
    score: DataTypes.INTEGER,
    options: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'user_survey_answer',
  })
  return user_survey_answer
}