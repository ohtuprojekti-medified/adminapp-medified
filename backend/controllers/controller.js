/**
 * Controller for database queries
 *
 * @module controllers/controller
 * @requires date-fns
 * @requires models/db
 * @requires models/Sequelize
 */

const { addDays } = require('date-fns')
const { Sequelize } = require('../models')
const db = require('../models')
const user_profiles = db.user_profiles
const access_codes = db.acces_codes
const organisations = db.organisations
const user_care_givers = db.user_care_givers
const user_survey_answers = db.user_survey_answers
const user_professional_profiles = db.user_professional_profiles
const user_diary_items = db.user_diary_items
const user_diary_item_groups = db.user_diary_item_groups
const user_activities = db.user_activities
const user_answers = db.user_answers
const user_care_giver_activities = db.user_care_giver_activities


/**
 * Returns all user activities in app today from database
 *
 * @returns  {...any} userActivitiesToday - list of user activities today
 */

const findUserActivitiesToday = async () => {
  const Op = Sequelize.Op
  const TODAY_START = new Date(new Date().setHours(0, 0, 0, 0))
  const NOW = new Date()
  const userActivitiesToday = await user_activities.findAll({
    where: {
      created_at: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW
      }
    }
  })
  return userActivitiesToday
}

/**
 * Returns new users within week from database
 *
 * @returns  {...any} usersCreatedAt - list of new users registered in the last week
 */

const findNewUsers = async () => {
  const Op = Sequelize.Op
  const NOW = new Date()
  const WEEK_AGO = new Date(new Date() - 604800000)

  const usersCreatedAt = await user_profiles.findAll({
    where: {
      created_at: {
        [Op.gt]: WEEK_AGO,
        [Op.lt]: NOW
      }
    },
    attributes: ['user_id', 'created_at', 'updated_at', 'added_organisation']
  })

  return usersCreatedAt
}

/**
 * Returns total cumulative new users week by week from database
 *
 * @returns {...any} entries - new users in following format week: [beginning, end], entries: cumulative amount
 */

const findCumulativeNewUsers = async () => {
  const usersCreatedAt = await user_profiles.findAll({
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['created_at']
  })

  const createdDates = usersCreatedAt.map(user => user.dataValues)

  const first = createdDates[0].created_at.getTime()
  const last = createdDates[createdDates.length - 1].created_at.getTime()
  let timeFrame = first + 604800000
  let counter = 0
  let week = [new Date(first), addDays(first, 7)]
  let entries = []
  while (timeFrame < last + 604800000) {
    while(createdDates[counter].created_at <= timeFrame && counter < createdDates.length - 1) {
      counter++
    }
    const object = { week: week, entries: counter+1 }
    entries = [...entries, object]
    const temp = week[1]
    week = [temp, addDays(temp, 7)]
    timeFrame = timeFrame + 604800000
  }


  return entries
}

/**
 * Returns all access codes from database
 *
 * @returns  {...any} accessCodes - list of access codes
 */

const findAllAccessCodes = async () => {
  const accessCodes = await access_codes.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return accessCodes
}

/**
 * Returns all organisations from database
 *
 * @returns  {...any} allOrganisations - list of organisations
 */

const findAllOrgs = async () => {
  const allOrganisations = await organisations.findAll()
  return allOrganisations
}

/**
 * Returns all users from database
 *
 * @returns  {...any} userProfiles - list of users
 */

const findAllUsers = async () => {
  const userProfiles = await user_profiles.findAll({
    attributes: ['user_id', 'created_at', 'first_name', 'last_name', 'updated_at', 'added_organisation']
  })
  return userProfiles
}

/**
 * Returns all caregivers from database
 * Note that caregivers-table contains one db-entry for every caregiver-user realtionship
 *
 * @returns  {...any} userCaregivers - list of caregiver-user relationships
 */

const findAllUserCaregivers = async () => {
  const userCaregivers = await user_care_givers.findAll({
    attributes: ['id', 'user_id', 'access_code_id', 'consent', 'created_at', 'updated_at']
  })
  return userCaregivers
}

/**
 * Returns all user ctivities from database
 *
 * @returns  {...any} userActivities - list of all user activities
 */

const findAllUserActivities = async () => {
  const userActivities = await user_activities.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return userActivities
}

/**
 * Returns all caregiver activities from database
 *
 * @returns  {...any} userCaregiverActivities - list of all caregiver activities
 */

const findAllUserCaregiverActivities = async () => {
  const userCaregiverActivities = await user_care_giver_activities.findAll({
    attributes: ['id', 'user_care_giver_id', 'created_at', 'updated_at']
  })
  return userCaregiverActivities
}

/**
 * Returns all user answers from database
 *
 * @returns  {...any} userAnswers - list of user answers
 */

const findAllUserAnswers = async () => {
  const userAnswers = await user_answers.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  console.log('TESTAILLAA TÄÄL')
  console.log(userAnswers)
  return userAnswers
}

/**
 * Returns all diary items from database
 *
 * @returns  {...any} userDiaryItems - list of all user diary items
 */

const findAllUserDiaryItems = async () => {
  const userDiaryItems = await user_diary_items.findAll({
    attributes: ['id', 'user_id', 'diary_item_id', 'positive', 'extra', 'created_at', 'updated_at', 'name', 'user_diary_item_group_id']
  })
  return userDiaryItems
}

/**
 * Returns all diary item groups from database
 *
 * @returns  {...any} userDiaryItemGroups - list of diary item groups
 */

const findAllUserDiaryItemGroups = async () => {
  const userDiaryItemGroups = await user_diary_item_groups.findAll({
    attributes: ['id', 'user_id', 'extra']
  })
  return userDiaryItemGroups
}

/**
 * Returns all professional profiles from database
 *
 * @returns  {...any} userProfessionalProfiles - list of all professional profiles
 */

const findAllUserProfessionalProfiles = async () => {
  const userProfessionalProfiles = await user_professional_profiles.findAll({
    attributes: ['professional_id', 'user_id', 'name', 'profession', 'workplace', 'created_at', 'updated_at']
  })
  return userProfessionalProfiles
}

/**
 * Returns all survey answers from database
 *
 * @returns  {...any} userSurveyAnswers - list of survey answers
 */

const findAllUserSurveyAnswers = async () => {
  const userSurveyAnswers = await user_survey_answers.findAll({
    attributes: ['id', 'user_id', 'survey_id', 'score', 'options', 'created_at', 'updated_at']
  })
  return userSurveyAnswers
}
module.exports = {
  findAllOrgs,
  findAllAccessCodes,
  findAllUsers,
  findAllUserCaregivers,
  findAllUserActivities,
  findAllUserCaregiverActivities,
  findAllUserAnswers,
  findAllUserDiaryItems,
  findAllUserDiaryItemGroups,
  findAllUserProfessionalProfiles,
  findAllUserSurveyAnswers,
  findCumulativeNewUsers,
  findNewUsers,
  findUserActivitiesToday
}