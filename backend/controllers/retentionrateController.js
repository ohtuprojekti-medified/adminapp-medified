/**.
 * Controller for retentionRate queries
 *
 * @module backend/controllers/retentionrateController
 * @requires date-fns
 * @requires backend/models/index
 * @requires backend/controllers/controller
 * @exports findRetentionRates
 * @exports findAverageRetentionRate
 */
const { differenceInCalendarDays } = require('date-fns')
const db = require('../models')
const user_profiles = db.user_profiles
const user_activities = db.user_activities
const controller = require('./controller')
const { addDateFilterToQuery } = require('./filters')


/**.
 * Returns retention rates as in how long does user use app actively
 *
 * @param {string} organisation - Organisation for filtering
 * @param {boolean} withCaregiver - Show only users with caregiver filter value
 * @param {string} startDate - Start date for filtering
 * @param {string} endDate - End date for filtering
 * @async
 * @constant
 * @memberof module:backend/controllers/retentionrateController
 * @returns {...any} usingPeriods - number of days per using period
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

  const userActivitiesData = await user_activities.findAll(activitiesQuery)
  const userActivities = userActivitiesData.map(activity => activity.dataValues)
  const userActivitiesIdArray = userActivities.map(activity => activity.user_id)

  const userProfilesData = await user_profiles.findAll({
    where: {
      user_id: userIdsArray
    },
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['user_id', 'created_at']
  })
  const userProfiles = userProfilesData.map(profile => profile.dataValues)
  const activeUsers = userProfiles.filter(user => userActivitiesIdArray.includes(user.user_id))

  let usingPeriods = []

  for (let user of activeUsers) {
    const usersActivity = userActivities.filter(activity => activity.user_id === user.user_id)
    let first = usersActivity[0].created_at
    let latest

    for (let i = 1; i < usersActivity.length; i++) {
      latest = usersActivity[i].created_at

      if (differenceInCalendarDays(usersActivity[i].created_at, usersActivity[i - 1].created_at) > 7) {

        if (differenceInCalendarDays(usersActivity[i - 1].created_at, first) !== 0) {
          const object = { daysUsed: differenceInCalendarDays(usersActivity[i - 1].created_at, first) }
          usingPeriods = [...usingPeriods, object]
          first = usersActivity[i].created_at
        }
      }
    }
    if (latest !== undefined && differenceInCalendarDays(latest, first) !== 0) {
      const object = { daysUsed: differenceInCalendarDays(latest, first) }
      usingPeriods = [...usingPeriods, object]
    }
  }

  return usingPeriods
}

/**.
 * Returns average retention rate
 *
 * @param {string} organisation - string id used to identify organisation
 * @param {boolean} withCaregiver - boolean value determining if data should contain only users with caregiver or all users
 * @param {string} startDate - Date object for limiting data from start
 * @param {string} endDate - Date object for limiting data from last
 * @async
 * @constant
 * @memberof module:backend/controllers/retentionrateController
 * @returns {...any} averageUsingPeriod - average app using period
 */

const findAverageRetentionRate = async (organisation, withCaregiver, startDate, endDate) => {
  let averageUsingPeriod = 0
  const allRetentionRates = await findRetentionRates(organisation, withCaregiver, startDate, endDate)
  const daysUsed = allRetentionRates.map(retentionRate => retentionRate.daysUsed)
  const sum = daysUsed.reduce((a, b) => a + b, 0)
  sum === 0
    ? averageUsingPeriod = 0
    : averageUsingPeriod = parseFloat((sum / daysUsed.length).toFixed(2))

  return averageUsingPeriod

}

module.exports = {
  findRetentionRates,
  findAverageRetentionRate
}