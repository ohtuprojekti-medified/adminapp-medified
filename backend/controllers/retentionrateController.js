const { subDays, differenceInCalendarDays } = require('date-fns')
const db = require('../models')
const user_profiles = db.user_profiles
const user_activities = db.user_activities

/**
 * Returns retention rates as in how long does user use app actively
 *
 * @returns  {...any} usingPeriods - number of activities and number of days per using period and averageUsingPeriod at the bottom of the json
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
    const TODAY = new Date(new Date().setHours(0, 0, 0, 0))
    const WEEK_AGO = subDays(TODAY, 7)

    const usersActivity = allActivities.filter(activity => activity.user_id === user.user_id)
    if (usersActivity[usersActivity.length - 1] > WEEK_AGO || usersActivity.length < 2) {
      continue
    }
    let numberOfActivities = 2
    let earlier = usersActivity[0].created_at
    let start = earlier

    for (let i = 1; i < usersActivity.length; i++) {

      if (differenceInCalendarDays(usersActivity[i].created_at, earlier) > 7) {
        if (numberOfActivities === 0 || differenceInCalendarDays(usersActivity[i].created_at, start) === 0) {
          continue
        }
        const object = {
          activities: numberOfActivities,
          daysUsed: differenceInCalendarDays(usersActivity[i].created_at, start)
        }
        usingPeriods = [...usingPeriods, object]
        numberOfActivities = 0
        if (i < usersActivity.length - 1) {
          start = usersActivity[i + 1].created_at
        }
      } else {
        numberOfActivities++
      }
      earlier = usersActivity[i].created_at
    }
  }
  const daysUsed = usingPeriods.map(obj => obj.daysUsed)
  const sum = daysUsed.reduce((a, b) => a + b, 0)
  const averageUsingPeriod = sum / daysUsed.length

  usingPeriods = [...usingPeriods, { averageUsagePeriod: averageUsingPeriod }]

  return usingPeriods

}

module.exports = {
  findRetentionRates
}