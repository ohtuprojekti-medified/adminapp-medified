const { addDays } = require('date-fns')
const db = require('../models')
const { Sequelize } = require('../models')
const user_profiles = db.user_profiles
const user_activities = db.user_activities
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

/**
 * Returns active users week by week
 *
 * @returns {...any} entries - active users in following format week: [beginning, end], entries: amount
 */
const findActiveUsers = async () => {
  const userActivities = await user_activities.findAll({
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['id', 'user_id', 'created_at']
  })
  const allActivities = userActivities.map(activity => activity.dataValues)

  const first = allActivities[0].created_at.getTime()
  //const last = allActivities[allActivities.length - 1].created_at.getTime()
  let currentWeek = first + 604800000
  let week = [new Date(first), addDays(first, 7)]
  let activeUsersThisWeek = []
  let entries = []
  for (let activity in allActivities) {
    while (activity.created_at >= currentWeek + 7 * 604800000) {
      const object = { week: week, entries: activeUsersThisWeek }
      entries = [...entries, object]
      activeUsersThisWeek = []
      currentWeek = currentWeek + 7 * 604800000
      week = [new Date(currentWeek), addDays(currentWeek, 7)]
    }
    if (!activeUsersThisWeek.contains(activity.user_id)) {
      activeUsersThisWeek = [...activeUsersThisWeek, activity.user_id]
    }
  }
  return entries
}

module.exports = {
  findCumulativeNewUsers,
  findNewUsers,
  findUserActivitiesToday,
  findActiveUsers
}