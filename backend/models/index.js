const config = require('../utils/config')

// Sequelize käyttöön
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
  host: config.db_host,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.patients = require('../models/patient')(sequelize, Sequelize)
db.moods = require('../models/mood')(sequelize, Sequelize)

db.patients.hasMany(db.moods)
db.moods.belongsTo(db.patients, {
  foreignKey: 'patientId'
})

module.exports = db
