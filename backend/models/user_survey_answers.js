/**.
 * User survey answers database model
 *
 * @module models/user_survey_answers
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_survey_answers
 * @exports user_survey_answers
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_survey_answers', {
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
    timestamps: false
  })
}