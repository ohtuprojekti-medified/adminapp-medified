/**.
 * User symptoms database model
 *
 * @module backend/models/user_symptoms
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_symptoms
 * @exports user_symptoms
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_symptoms', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
}