
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_survey_answers', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    survey_id: DataTypes.STRING,
    score: DataTypes.INTEGER,
    options: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    timestamps: false
  })
}