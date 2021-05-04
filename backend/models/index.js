'use strict'

/**.
 * Initialization for sequelize-database and models
 *
 * @module backend/models/index
 * @requires sequelize
 * @requires backend/utils/config
 * @requires backend/models/access_codes
 * @requires backend/models/organisations
 * @requires backend/models/user_professional_profiles
 * @requires backend/models/user_care_givers
 * @requires backend/models/user_activities
 * @requires backend/models/user_care_giver_activities
 * @requires backend/models/user_answers
 * @requires backend/models/user_diary_items
 * @requires backend/models/user_diary_item_groups
 * @requires backend/models/user_professional_profiles
 * @requires backend/models/user_survey_answers
 * @requires backend/models/user_consents
 * @requires backend/models/user_medicine
 * @requires backend/models/user_moods
 * @requires backend/models/user_treatments
 * @requires backend/models/user_symptoms
 * @exports db
 */

/**
 * Sequelize ORM - object-relational mapper.
 */
const Sequelize = require('sequelize')
const config = require('../utils/config')
const db = {}

/**
 * Initialization for database.
 */
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

/**
 * Defining sequelize ORM database models.
 */
db.access_codes = require('../models/access_codes')(sequelize, Sequelize)
db.organisations = require('../models/organisations')(sequelize, Sequelize)
db.user_profiles = require('../models/user_profiles')(sequelize, Sequelize)
db.user_care_givers = require('../models/user_care_givers')(sequelize, Sequelize)
db.user_activities = require('../models/user_activities')(sequelize, Sequelize)
db.user_care_giver_activities = require('../models/user_care_giver_activities')(sequelize, Sequelize)
db.user_answers = require('../models/user_answers')(sequelize, Sequelize)
db.user_diary_items = require('../models/user_diary_items')(sequelize, Sequelize)
db.user_diary_item_groups = require('../models/user_diary_item_groups')(sequelize, Sequelize)
db.user_professional_profiles = require('../models/user_professional_profiles')(sequelize, Sequelize)
db.user_survey_answers = require('../models/user_survey_answers')(sequelize, Sequelize)
db.user_consents = require('../models/user_consents')(sequelize, Sequelize)
db.user_medicine = require('../models/user_medicine')(sequelize, Sequelize)
db.user_moods = require('../models/user_moods')(sequelize, Sequelize)
db.user_treatments = require('../models/user_treatments')(sequelize, Sequelize)
db.user_symptoms = require('../models/user_symptoms')(sequelize, Sequelize)
module.exports = db
