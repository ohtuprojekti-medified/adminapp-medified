module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  })
  Patient.associate = function(models) {
    Patient.hasMany(models.mood, {
      foreignKey: 'patientId',
      as: 'moods',
    })
  }

  return Patient
}