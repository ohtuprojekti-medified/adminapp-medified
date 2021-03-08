module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_symptoms', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
}