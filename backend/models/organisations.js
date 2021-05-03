/**.
 * Organisations database model
 *
 * @module backend/models/organisations
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for organisations
 * @exports organisations
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('organisations', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    primary_color: DataTypes.STRING,
    primary_bg_color: DataTypes.STRING,
    secondary_color: DataTypes.STRING,
    secondary_bg_color: DataTypes.STRING,
    action_color: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    timestamps: false
  })
}

