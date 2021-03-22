const { differenceInCalendarDays } = require('date-fns')
const db = require('../models')
const user_profiles = db.user_profiles
const user_activities = db.user_activities

/**
 * Returns retention rates as in how long does user use app actively
 *
 * @returns  {...any} usingPeriods - number of days per using period
 */

const findRetentionRates = async () => {
  const userActivities = await user_activities.findAll({
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['id', 'user_id', 'created_at']
  })
  const allActivities = userActivities.map(activity => activity.dataValues)
  const userIds = allActivities.map(obj => obj.user_id)

  const userProfiles = await user_profiles.findAll({
    order: [
      ['created_at', 'ASC']
    ],
    attributes: ['user_id', 'created_at']
  })
  const allUserProfiles = userProfiles.map(profile => profile.dataValues)
  const activeUsers = allUserProfiles.filter(user => userIds.includes(user.user_id))

  let usingPeriods = []

  for (let user of activeUsers) {
    const usersActivity = allActivities.filter(activity => activity.user_id === user.user_id)
    let first = usersActivity[0].created_at

    for (let i=1; i<usersActivity.length; i++) {

      if(differenceInCalendarDays(usersActivity[i].created_at, usersActivity[i-1].created_at) > 7) {

        if(differenceInCalendarDays(usersActivity[i-1].created_at, first) === 0) {
          continue
        }

        const object = { daysUsed: differenceInCalendarDays(usersActivity[i-1].created_at, first) }
        usingPeriods = [...usingPeriods, object]

        if(i+1 >= usersActivity.length) {
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
 * @returns  {...any} averageUsingPeriod - average app using period
 */

const findAverageRetentionRate = async () => {
  const allRates = await findRetentionRates()
  const daysUsed = allRates.map(obj => obj.daysUsed)
  const sum = daysUsed.reduce((a, b) => a + b, 0)
  const averageUsingPeriod = sum / daysUsed.length

  return averageUsingPeriod

}

module.exports = {
  findRetentionRates,
  findAverageRetentionRate
}