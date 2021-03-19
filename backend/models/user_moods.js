module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_moods', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    value: DataTypes.DOUBLE
  }, {
    timestamps: false
  })
}