module.exports = (sequelize, DataTypes) => {
  return sequelize.define('access_codes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING
  }, {
    timestamps: false
  })
}
