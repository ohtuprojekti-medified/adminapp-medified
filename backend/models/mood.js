module.exports = (sequelize, Sequelize) => {
  const Mood = sequelize.define('Mood', {
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
    },
    patientId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  })

  return Mood
}