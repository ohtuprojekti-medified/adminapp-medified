/**
 * User moods database model
 *
 * @module models/user_moods
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_moods
 * @exports user_moods
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_moods', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    value: DataTypes.DOUBLE
  }, {
    timestamps: false
  })
}