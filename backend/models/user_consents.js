module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_consents', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    consent: DataTypes.BOOLEAN,
    version: DataTypes.STRING
  }, {
    timestamps: false
  })
}