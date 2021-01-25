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
    userId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  })

  Mood.associate = function(models) {
    Mood.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient'
    })
  }



  return Mood
}