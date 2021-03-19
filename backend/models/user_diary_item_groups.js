/**
 * User diary item groups model
 *
 * @module models/user_diary_item_groups
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_diary_item_groups
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_diary_item_groups', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    extra: DataTypes.STRING(4096)
  }, {
    timestamps: false
  })
}