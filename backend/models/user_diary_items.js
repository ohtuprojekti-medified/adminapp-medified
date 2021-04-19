/**
 * User diary items database model
 *
 * @module models/user_diary_items
 *
 * @param {...any} sequelize - ORM - object-relational mapper
 * @param {DataTypes} DataTypes - sequelize database types
 * @returns {...any} model for user_diary_items
 * @exports user_diary_items
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_diary_items', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    diary_item: DataTypes.INTEGER,
    positive: DataTypes.BOOLEAN,
    extra: DataTypes.STRING(4096),
    icon: DataTypes.STRING,
    name: DataTypes.STRING(20),
    user_diary_item_group_id: DataTypes.BIGINT
  }, {
    timestamps: false
  })
}