
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_answers', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    option_id: DataTypes.STRING,
    extra: DataTypes.STRING
  }, {
    timestamps: false
  })
}