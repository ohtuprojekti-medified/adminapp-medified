'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_diary_items extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // }
  }
  user_diary_items.init({
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
    timestamps: false,
    sequelize,
    modelName: 'user_diary_items',
  })
  return user_diary_items
}