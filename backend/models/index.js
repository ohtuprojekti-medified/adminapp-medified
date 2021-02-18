'use strict'

const Sequelize = require('sequelize')
const config = require('../utils/config')
const db = {}

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    host: config.db_host,
    dialect: 'postgres',
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

db.acces_codes = require('../models/access_codes')(sequelize, Sequelize)
db.organisations = require('../models/organisations')(sequelize, Sequelize)
db.user_profiles = require('../models/user_profiles')(sequelize, Sequelize)

module.exports = db
