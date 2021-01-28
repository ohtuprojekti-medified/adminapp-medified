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

  return Patient
}