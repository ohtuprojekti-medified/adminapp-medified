/**.
 * User answers database model
 *
 * @module models/user_answers
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_anwers
 * @exports user_answers
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_answers', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    option_id: DataTypes.STRING,
    extra: DataTypes.STRING
  }, {
    timestamps: false
  })
}