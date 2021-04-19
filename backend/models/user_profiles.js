/**
 * User profiles database model
 *
 * @module models/user_profiles
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_profiles
 * @exports user_profiles
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_profiles', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    height: DataTypes.DOUBLE,
    weight: DataTypes.DOUBLE,
    sex: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    added_organisation: DataTypes.STRING,
  }, {
    timestamps: false
  })
}

