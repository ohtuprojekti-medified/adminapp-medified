
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('organisations', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    primary_color: DataTypes.STRING,
    primary_bg_color: DataTypes.STRING,
    secondary_color: DataTypes.STRING,
    secondary_bg_color: DataTypes.STRING,
    action_color: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    timestamps: false
  })
}

