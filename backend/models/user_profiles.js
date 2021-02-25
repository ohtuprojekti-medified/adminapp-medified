
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_profiles', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    height: DataTypes.DOUBLE,
    weight: DataTypes.DOUBLE,
    sex: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    added_organisation: DataTypes.STRING,
  }, {
    timestamps: false
  })
}

