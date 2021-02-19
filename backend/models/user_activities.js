
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_activities', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING
  }, {
    timestamps: false
  })
}
