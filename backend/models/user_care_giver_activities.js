/**.
 * User caregiver activities database model
 *
 * @module backend/models/user_care_giver_activities
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_care_giver_activities
 * @exports user_care_giver_activities
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_care_giver_activities', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_care_giver_id: DataTypes.BIGINT
  }, {
    timestamps: false
  })
}