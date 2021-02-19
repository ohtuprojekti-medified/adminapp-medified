
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_care_giver_activities', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_care_giver_id: DataTypes.BIGINT
  }, {
    timestamps: false
  })
}