module.exports = (sequelize, Sequelize) => {
  const Mood = sequelize.define('mood', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    range: {
      type: Sequelize.INTEGER
    }
  })

  return Mood
}