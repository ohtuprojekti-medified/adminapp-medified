module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_care_givers', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    access_code_id: DataTypes.STRING,
    consent: DataTypes.BOOLEAN
  }, {
    timestamps: false
  })
}