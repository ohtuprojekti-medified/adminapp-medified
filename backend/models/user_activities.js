/**
 * User activities model
 *
 * @module models/user_activities
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_activities
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_activities', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING
  }, {
    timestamps: false
  })
}
