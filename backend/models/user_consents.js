/**.
 * User consents database model
 *
 * @module backend/models/user_consents
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_consents
 * @exports user_consents
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_consents', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    consent: DataTypes.BOOLEAN,
    version: DataTypes.STRING
  }, {
    timestamps: false
  })
}