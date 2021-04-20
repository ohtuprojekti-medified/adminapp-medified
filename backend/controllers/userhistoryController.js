/**.
 * Controller for userhistory queries
 *
 * @module controllers/userhistoryController
 * @requires date-fns
 * @requires models
 * @requires sequelize
 * @requires controllers/controller
 * @exports findCumulativeNewUsers
 * @exports findNewUsers
 * @exports findUserActivitiesToday
 * @exports findActiveUsers
 */
const { addDays } = require('date-fns')
const db = require('../models')
const { Sequelize } = require('../models')
const { Op } = require('sequelize')
const user_profiles = db.user_profiles
const user_activities = db.user_activities
const controller = require('./controller')

/**.
 * Returns all user activities in app today from database
 *
 * @param {string} organisation - Organisation name for filtering
 * @param {boolean} withCaregiver - Boolean value for filtering patiens with caregiver
 * @async
 * @constant
 * @memberof module:controllers/userhistoryController
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
 * @memberof module:controllers/userhistoryController
 * @returns {...any} usersCreatedAt - list of new users registered in the last week
 */

const findNewUsers = async (organisation, withCaregiver) => {
  const Op = Sequelize.Op
  const NOW = new Date()
  const WEEK_AGO = new Date(new Date() - 604800000)

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
 * @memberof module:controllers/userhistoryController
 * @returns {...any} entries - new users in following format week: [beginning, end], entries: cumulative amount
 */

const findCumulativeNewUsers = async (organisation, withCaregiver, startDate, endDate) => {
  const userIds = await controller.findAllUsers(organisation, withCaregiver)
  let usersCreatedAt
  if (startDate === '' && endDate === '') {
    usersCreatedAt = await user_profiles.findAll({
      where: {
        user_id: userIds.map(user => user.user_id)
      },
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['created_at']
    })
  } else if (startDate === '') {
    usersCreatedAt = await user_profiles.findAll({
      where: {
        user_id: userIds.map(user => user.user_id),
        created_at: {
          [Op.lte]: endDate
        }
      },
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['created_at']
    })
  }
  else if (endDate === '') {
    usersCreatedAt = await user_profiles.findAll({
      where: {
        user_id: userIds.map(user => user.user_id),
        created_at: {
          [Op.gte]: startDate
        }
      },
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['created_at']
    })
  }
  else {
    usersCreatedAt = await user_profiles.findAll({
      where: {
        user_id: userIds.map(user => user.user_id),
        created_at: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['created_at']
    })
  }

  const createdDates = usersCreatedAt.map(user => user.dataValues)

  if (createdDates.length === 0) {
    return []
  }
  const first = createdDates[0].created_at.getTime()
  const last = createdDates[createdDates.length - 1].created_at.getTime()
  let timeFrame = first + 604800000
  let counter = 0
  let week = [new Date(first), addDays(first, 7)]
  let entries = []
  while (timeFrame < last + 604800000) {
    while (createdDates[counter].created_at <= timeFrame && counter < createdDates.length - 1) {
      counter++
    }
    const object = { week: week, entries: counter + 1 }
    entries = [...entries, object]
    const temp = week[1]
    week = [temp, addDays(temp, 7)]
    timeFrame = timeFrame + 604800000
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
 * @memberof module:controllers/userhistoryController
 * @returns {...any} entries - active users in following format week: [beginning, end], entries: amount
 */
const findActiveUsers = async (organisation, withCaregiver, startDate, endDate) => {
  const userIds = await controller.findAllUsers(organisation, withCaregiver)
  let userActivities
  if (startDate === '' && endDate === '') {
    userActivities = await user_activities.findAll({
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['id', 'user_id', 'created_at'],
      where: {
        user_id: userIds.map(user => user.user_id)
      }
    })
  } else if (startDate === '') {
    userActivities = await user_activities.findAll({
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['id', 'user_id', 'created_at'],
      where: {
        user_id: userIds.map(user => user.user_id),
        created_at: {
          [Op.lte]: endDate
        }
      }
    })
  } else if (endDate === '') {
    userActivities = await user_activities.findAll({
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['id', 'user_id', 'created_at'],
      where: {
        user_id: userIds.map(user => user.user_id),
        created_at: {
          [Op.gte]: startDate
        }
      }
    })
  } else {
    userActivities = await user_activities.findAll({
      order: [
        ['created_at', 'ASC']
      ],
      attributes: ['id', 'user_id', 'created_at'],
      where: {
        user_id: userIds.map(user => user.user_id),
        created_at: {
          [Op.between]: [startDate, endDate]
        }
      }
    })
  }

  const allActivities = userActivities.map(activity => activity.dataValues)
  if (allActivities.length === 0) {
    return []
  }
  const first = allActivities[0].created_at.getTime()
  let currentWeek = first + 604800000
  let week = [new Date(first), addDays(first, 7)]
  let activeUsersThisWeek = []
  let entries = []
  for (let i = 0; i < allActivities.length; i++) {
    while (allActivities[i].created_at >= currentWeek + 604800000) {
      const object = { week: week, entries: activeUsersThisWeek.length }
      entries = [...entries, object]
      activeUsersThisWeek = []
      currentWeek = currentWeek + 604800000
      week = [new Date(currentWeek), addDays(currentWeek, 7)]
    }
    if (!activeUsersThisWeek.includes(allActivities[i].user_id)) {
      activeUsersThisWeek = [...activeUsersThisWeek, allActivities[i].user_id]
    }
  }
  const object = { week: week, entries: activeUsersThisWeek.length }
  entries = [...entries, object]
  return entries
}

module.exports = {
  findCumulativeNewUsers,
  findNewUsers,
  findUserActivitiesToday,
  findActiveUsers
}