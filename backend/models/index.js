'use strict'

const Sequelize = require('sequelize')
const config = require('../utils/config')
const db = {}

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


db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('../models/appuser')(sequelize, Sequelize)

module.exports = db
