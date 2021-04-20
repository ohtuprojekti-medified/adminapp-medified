const { differenceInCalendarDays } = require('date-fns')
const db = require('../models')
const user_profiles = db.user_profiles
const user_activities = db.user_activities
const controller = require('./controller')
const { addDateFilterToQuery } = require('./filters')


/**
 * Returns retention rates as in how long does user use app actively
 *
 * @param {string} organisation - Organisation for filtering
 * @param {boolean} withCaregiver - Show only users with caregiver filter value
 * @param {string} startDate - Start date for filtering
 * @param {string} endDate - End date for filtering
 * @returns  {...any} usingPeriods - number of days per using period
 */
const findRetentionRates = async (organisation, withCaregiver, startDate, endDate) => {
  const userIds = await controller.findAllUsers(organisation, withCaregiver)
  const userIdsArray = userIds.map(user => user.user_id)

  let activitiesQuery = {
    where: {
      user_id: userIdsArray
    },
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['id', 'user_id', 'created_at']
  }

  addDateFilterToQuery(activitiesQuery, startDate, endDate)
  const userActivities = await user_activities.findAll(activitiesQuery)

  const userProfiles = await user_profiles.findAll({
    where: {
      user_id: userIdsArray
    },
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['user_id', 'created_at']
  })


  const allActivities = userActivities.map(activity => activity.dataValues)
  const userIdsActivities = allActivities.map(obj => obj.user_id)

  const allUserProfiles = userProfiles.map(profile => profile.dataValues)
  const activeUsers = allUserProfiles.filter(user => userIdsActivities.includes(user.user_id))
  let usingPeriods = []

  for (let user of activeUsers) {
    const usersActivity = allActivities.filter(activity => activity.user_id === user.user_id)
    let first = usersActivity[0].created_at

    for (let i = 1; i < usersActivity.length; i++) {

      if (differenceInCalendarDays(usersActivity[i].created_at, usersActivity[i - 1].created_at) > 7) {

        if (differenceInCalendarDays(usersActivity[i - 1].created_at, first) === 0) {
          continue
        }

        const object = { daysUsed: differenceInCalendarDays(usersActivity[i - 1].created_at, first) }
        usingPeriods = [...usingPeriods, object]

        if (i + 1 >= usersActivity.length) {
          break
        }
        first = usersActivity[i].created_at
      }
    }
  }

  return usingPeriods
}

/**
 * Returns average retention rate
 *
 * @param {string} organisation - string id used to identify organisation
 * @param {boolean} withCaregiver - boolean value determining if data should contain only users with caregiver or all users
 * @param {string} startDate - Date object for limiting data from start
 * @param {string} endDate - Date object for limiting data from last
 * @returns  {...any} averageUsingPeriod - average app using period
 */

const findAverageRetentionRate = async (organisation, withCaregiver, startDate, endDate) => {
  const allRates = await findRetentionRates(organisation, withCaregiver, startDate, endDate)
  const daysUsed = allRates.map(obj => obj.daysUsed)
  const sum = daysUsed.reduce((a, b) => a + b, 0)
  const averageUsingPeriod = sum / daysUsed.length

  return averageUsingPeriod

}

module.exports = {
  findRetentionRates,
  findAverageRetentionRate
}