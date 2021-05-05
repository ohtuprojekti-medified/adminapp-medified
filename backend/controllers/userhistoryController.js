/**.
 * Controller for userhistory queries
 *
 * @module backend/controllers/userhistoryController
 * @requires date-fns
 * @requires backend/models/index
 * @requires backend/controllers/controller
 * @exports findCumulativeNewUsers
 * @exports findNewUsers
 * @exports findUserActivitiesToday
 * @exports findActiveUsers
 */
const { addDays } = require('date-fns')
const db = require('../models')
const { Sequelize } = require('../models')
const user_profiles = db.user_profiles
const user_activities = db.user_activities
const controller = require('./controller')
const { addDateFilterToQuery } = require('./filters')

const WEEK_IN_MS = 604800000

/**.
 * Returns all user activities in app today from database
 *
 * @param {string} organisation - Organisation name for filtering
 * @param {boolean} withCaregiver - Boolean value for filtering patiens with caregiver
 * @async
 * @constant
 * @memberof module:backend/controllers/userhistoryController
 * @returns {...any} userActivitiesToday - list of user activities today
 */

const findUserActivitiesToday = async (organisation, withCaregiver) => {
  const Op = Sequelize.Op
  const TODAY_START = new Date(new Date().setHours(0, 0, 0, 0))
  const NOW = new Date()
  const userIds = await controller.findAllUsers(organisation, withCaregiver)
  const userActivitiesToday = await user_activities.findAll({
    where: {
      created_at: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW
      },
      user_id: userIds.map(user => user.user_id)
    }
  })
  return userActivitiesToday
}

/**.
 * Returns new users within week from database
 *
 * @param {string} organisation - Organisation name for filtering
 * @param {boolean} withCaregiver - Boolean value for filtering patiens with caregiver
 * @async
 * @constant
 * @memberof module:backend/controllers/userhistoryController
 * @returns {...any} usersCreatedAt - list of new users registered in the last week
 */

const findNewUsers = async (organisation, withCaregiver) => {
  const Op = Sequelize.Op
  const NOW = new Date()
  const WEEK_AGO = new Date(new Date() - WEEK_IN_MS)

  const userIds = await controller.findAllUsers(organisation, withCaregiver)
  const usersCreatedAt = await user_profiles.findAll({
    where: {
      created_at: {
        [Op.gt]: WEEK_AGO,
        [Op.lt]: NOW
      },
      user_id: userIds.map(user => user.user_id)
    },
    attributes: ['user_id', 'created_at', 'updated_at', 'added_organisation']
  })


  return usersCreatedAt
}

/**.
 * Returns total cumulative new users week by week from database
 *
 * @param {string} organisation - Organisation name for filtering
 * @param {boolean} withCaregiver - Boolean value for filtering patiens with caregiver
 * @param {string} startDate - Date object for limiting data from start
 * @param {string} endDate - Date object for limiting data from last
 * @async
 * @constant
 * @memberof module:backend/controllers/userhistoryController
 * @returns {...any} entries - new users in following format week: [beginning, end], entries: cumulative amount
 */

const findCumulativeNewUsers = async (organisation, withCaregiver, startDate, endDate) => {
  const userIds = await controller.findAllUsers(organisation, withCaregiver)

  let userProfilesQuery = {
    where: {
      user_id: userIds.map(user => user.user_id)
    },
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['created_at']
  }

  userProfilesQuery = addDateFilterToQuery(userProfilesQuery, startDate, endDate)
  const userProfilesData = await user_profiles.findAll(userProfilesQuery)
  const userProfiles = userProfilesData.map(user => user.dataValues)

  if (userProfiles.length === 0) return []

  const first = userProfiles[0].created_at.getTime()
  const last = userProfiles[userProfiles.length - 1].created_at.getTime()
  let currentWeek = first + WEEK_IN_MS
  let usersCounted = 0
  let week = [new Date(first), addDays(first, 7)]
  let entries = []

  while (currentWeek < last + WEEK_IN_MS) {
    while (userProfiles[usersCounted].created_at <= currentWeek) {
      usersCounted++
      if (usersCounted >= userProfiles.length) break
    }
    entries = [...entries, { week: week, entries: usersCounted }]
    week = [week[1], addDays(week[1], 7)]
    currentWeek = currentWeek + WEEK_IN_MS
  }

  return entries
}

/**.
 * Returns active users week by week
 *
 * @param {string} organisation - string id used to identify organisation
 * @param {boolean} withCaregiver - boolean value determining if data should contain only users with caregiver or all users
 * @param {string} startDate - Date object for limiting data from start
 * @param {string} endDate - Date object for limiting data from last
 * @async
 * @constant
 * @memberof module:backend/controllers/userhistoryController
 * @returns {...any} entries - active users in following format week: [beginning, end], entries: amount
 */
const findActiveUsers = async (organisation, withCaregiver, startDate, endDate) => {
  const userIds = await controller.findAllUsers(organisation, withCaregiver)
  let userAcitivitiesQuery = {
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['id', 'user_id', 'created_at'],
    where: {
      user_id: userIds.map(user => user.user_id)
    }
  }
  userAcitivitiesQuery = addDateFilterToQuery(userAcitivitiesQuery, startDate, endDate)

  const userActivitiesData = await user_activities.findAll(userAcitivitiesQuery)
  const userActivities = userActivitiesData.map(activity => activity.dataValues)

  if (userActivities.length === 0) return []

  const first = userActivities[0].created_at.getTime()
  const last = userActivities[userActivities.length - 1].created_at.getTime()
  let currentWeek = first + WEEK_IN_MS
  let week = [new Date(first), addDays(first, 7)]
  let activeUsersThisWeek = []
  let counter = 0

  let entries = []

  while (currentWeek < last + WEEK_IN_MS) {
    while (userActivities[counter].created_at <= currentWeek ) {
      counter++
      if(counter >= userActivities.length) break
      if (!activeUsersThisWeek.includes(userActivities[counter-1].user_id)) {
        activeUsersThisWeek = [...activeUsersThisWeek, userActivities[counter-1].user_id]
      }
    }
    entries = [...entries, { week: week, entries: activeUsersThisWeek.length }]
    activeUsersThisWeek = []
    currentWeek = currentWeek + WEEK_IN_MS
    week = [week[1], addDays(week[1], 7)]
  }
  return entries
}

module.exports = {
  findCumulativeNewUsers,
  findNewUsers,
  findUserActivitiesToday,
  findActiveUsers
}