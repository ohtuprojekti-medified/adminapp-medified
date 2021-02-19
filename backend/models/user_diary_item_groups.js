
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