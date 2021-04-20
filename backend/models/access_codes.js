/**.
 * Access codes database model
 *
 * @module models/access_codes
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for access_codes
 * @exports access_codes
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('access_codes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    organisation_id: DataTypes.STRING
  }, {
    timestamps: false
  })
}
