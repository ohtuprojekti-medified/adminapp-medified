
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_professional_profiles', {
    professional_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    name: DataTypes.STRING,
    profession: DataTypes.STRING,
    workplace: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    timestamps: false
  })
}