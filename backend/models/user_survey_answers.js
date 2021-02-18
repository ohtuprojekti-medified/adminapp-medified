'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_survey_answers extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_survey_answers.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    survey_id: DataTypes.STRING,
    score: DataTypes.INTEGER,
    options: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    timestamps: false,
    sequelize,
    modelName: 'user_survey_answers',
  })
  return user_survey_answers
}
