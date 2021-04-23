const { addDays } = require('date-fns')
const controller = require('./controller')
const db = require('../models')
const user_moods = db.user_moods
const user_care_givers = db.user_care_givers
const { addDateFilterToQuery } = require('./filters')

const findWeeklyValues = async (organisation, withCaregiver, startDate, endDate, variable) => {

  console.log('MITÄS TÄÄL')
  console.log(startDate)


  if (variable === 'MOOD') {
    let userMoodData = []
    let moodsWeekly = []
    let weeklyValuesQuery

    if (organisation === 'ALL') {

      if (withCaregiver === true) {
        const userCaregivers = await user_care_givers.findAll({
          attributes: ['user_id', 'access_code_id', 'created_at', 'updated_at', 'consent']
        })

        weeklyValuesQuery = {
          attributes: ['id', 'user_id', 'created_at', 'value'],
          where: {
            user_id: userCaregivers.map(userCaregiver => userCaregiver.user_id)
          },
          order: [
            ['created_at', 'ASC'],
            ['user_id', 'ASC']
          ]
        }

        addDateFilterToQuery(weeklyValuesQuery, startDate, endDate)

        userMoodData = await user_moods.findAll(weeklyValuesQuery)

        moodsWeekly = await findWeeklyMoods(userMoodData)

      } else {
        weeklyValuesQuery = {
          order: [
            ['created_at', 'ASC'],
            ['user_id', 'ASC']
          ],
          attributes: ['id', 'user_id', 'created_at', 'value']
        }
        addDateFilterToQuery(weeklyValuesQuery)
        userMoodData = await user_moods.findAll(weeklyValuesQuery)

        moodsWeekly = await findWeeklyMoods(userMoodData)
      }
    } else {
      if (withCaregiver === true) {
        const organisationalAccessCodes = await controller.findAllAccessCodes(organisation)
        const organisationalAccessCodesIdArray = organisationalAccessCodes.map(accessCode => accessCode.id)

        const caregiversInOrganisation = await user_care_givers.findAll({
          where: {
            access_code_id: organisationalAccessCodesIdArray
          }
        })
        const userIdsLinkedToOrganisationalCaregivers = caregiversInOrganisation.map(caregiver => caregiver.user_id)
        const uniqueIds = [...new Set(userIdsLinkedToOrganisationalCaregivers)]

        weeklyValuesQuery = {
          attributes: ['id', 'user_id', 'created_at', 'value'],
          where: {
            user_id: uniqueIds
          }
        }
        addDateFilterToQuery(weeklyValuesQuery)
        userMoodData = await user_moods.findAll(weeklyValuesQuery)
        moodsWeekly = await findWeeklyMoods(userMoodData)

      } else {
        const usersInOrganisation = await controller.findAllUsers(organisation, false)
        const usersInOrganisationIdArray = usersInOrganisation.map(user => user.user_id)

        weeklyValuesQuery = {
          attributes: ['id', 'user_id', 'created_at', 'value'],
          where: {
            user_id: usersInOrganisationIdArray
          }
        }
        addDateFilterToQuery(weeklyValuesQuery)
        userMoodData = await user_moods.findAll(weeklyValuesQuery)

        moodsWeekly = await findWeeklyMoods(userMoodData)
      }
    }
    return moodsWeekly
  } else {
    return null
    // TO DO: implement bdi and phq-9 variables
  }
}

const findWeeklyMoods = async (userMoodsData) => {

  if (userMoodsData.length === 0) {
    return null
  }

  const userMoods = userMoodsData.map(mood => mood.dataValues)

  const userIds = userMoods.map(userMood => userMood.user_id)
  const uniqueUserIds = [...new Set(userIds)]
  const convertedIds = convertIds(uniqueUserIds)

  const firstCreated = userMoods[0].created_at.getTime()
  const first = new Date(firstCreated).setHours(0, 0, 0, 0)
  const last = userMoods[userMoods.length - 1].created_at.getTime()

  let timeFrame = first + 604800000
  let week = [new Date(first), addDays(first, 7)]
  let counter = 0
  let oneUserMoods = []
  let weeklyMoods = []

  // Arrange user_moods weekly
  while (timeFrame <= last) {
    while (counter < userMoods.length && userMoods[counter].created_at < timeFrame) {
      oneUserMoods = [...oneUserMoods, userMoods[counter]]
      counter++
    }
    const weeklyValues = {
      week: week,
      values: oneUserMoods
    }
    weeklyMoods = [...weeklyMoods, weeklyValues]
    const temp = week[1]
    week = [temp, addDays(temp, 7)]
    timeFrame = timeFrame + 604800000
    oneUserMoods = []
  }

  //  Count average moods
  let weekDates
  let valuesWeekly = []
  for (let i = 0; i < weeklyMoods.length; i++) {
    weekDates = weeklyMoods[i].week
    let moodValues = weeklyMoods[i].values

    if (moodValues.length === 0) {
      const averageValue = {
        week: weekDates,
        averages: null
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    } else if (moodValues.length === 1) {
      const originalId = moodValues[0].user_id
      const convertedId = convertedIds.find(id => id.originalId === originalId)
      const moodAndId = {
        id: convertedId.newId,
        average: moodValues[0].value
      }
      const averageAndId = {
        id: 'average',
        average: moodValues[0].value
      }
      const averageValue = {
        week: weekDates,
        averages: [moodAndId, averageAndId]
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    } else {
      moodValues.sort((a, b) => (a.user_id > b.user_id) ? 1 : ((b.user_id > a.user_id) ? -1 : 0))

      let averages = []
      let sum = 0
      let count = 0
      let average, value

      for (let i = 0; i < moodValues.length; i++) {
        value = moodValues[i].value
        sum = sum + value
        count++

        if (i + 1 === moodValues.length) {
          average = sum / count
          average = parseFloat(average.toFixed(2))
          const originalId = moodValues[i].user_id
          const convertedId = convertedIds.find(id => id.originalId === originalId)
          const moodAndId = {
            id: convertedId.newId,
            average: average
          }
          averages = [...averages, moodAndId]
          sum = 0
          count = 0
        } else if (moodValues[i].user_id !== moodValues[i + 1].user_id) {
          average = sum / count
          average = parseFloat(average.toFixed(2))
          const originalId = moodValues[i].user_id
          const convertedId = convertedIds.find(id => id.originalId === originalId)
          const moodAndId = {
            id: convertedId.newId,
            average: average
          }
          averages = [...averages, moodAndId]
          sum = 0
          count = 0
        }

      }
      const averageValues = averages.map(average => average.average)
      const averageSum = averageValues.reduce((a, b) => a + b, 0)
      let averageOfAverages = averageSum / averageValues.length
      averageOfAverages = parseFloat(averageOfAverages.toFixed(2))
      const averageAndId = {
        id: 'average',
        average: averageOfAverages
      }
      averages = [...averages, averageAndId]
      const averageValue = {
        week: weekDates,
        averages: averages
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    }
  }
  return valuesWeekly
}

/**.
 * Find weekly mood improvement percentages
 *
 * @constant
 * @async
 * @param {string} organisation - Organisation for filtering
 * @param {boolean} withCaregiver - Show only users with caregiver filter value
 * @param {string} startDate - Start date for filtering
 * @param {string} endDate - End date for filtering
 * @param {string} variable - Selector for mood data type
 * @returns {Array} - Mood improvement percentages and their dates in an array
 */
const findWeeklyImprovement = async (organisation, withCaregiver, startDate, endDate, variable) => {
  const weeklyValues = await findWeeklyValues(organisation, withCaregiver, startDate, endDate, variable)

  let lastValue = [...weeklyValues][0].averages === null
    ? 0
    : [...weeklyValues][0].averages.filter(average => average.id === 'average')[0].average
  let weeklyImprovement = []
  weeklyValues === null
    ? null
    : [...weeklyValues].forEach(entry => {
      const newValue = entry.averages === null
        ? lastValue
        : entry.averages.filter(average => average.id === 'average')[0].average
      weeklyImprovement.push({
        week: entry.week,
        average: ((newValue - lastValue) / lastValue).toFixed(2)
      })
      lastValue = newValue
    })
  return weeklyImprovement
}
/**.
 * Find change in current week's mood in relation to mood on first week
 *
 * @param {*} organisation - Organisation for filtering
 * @param {*} withCaregiver - Show only users with caregiver filter value
 * @param {*} startDate - Start date for filtering
 * @param {*} endDate - End date for filtering
 * @param {*} variable - Selector for mood data type
 * @returns {Array} - Mood change percentages and their dates in an array
 */
const findTotalImprovement = async (organisation, withCaregiver, startDate, endDate, variable) => {
  const weeklyValues = await findWeeklyValues(organisation, withCaregiver, startDate, endDate, variable)

  let firstValue = [...weeklyValues][0].averages === null
    ? 0
    : [...weeklyValues][0].averages.filter(average => average.id === 'average')[0].average

  let lastValue = firstValue
  let totalImprovements = []

  weeklyValues === null
    ? null
    : [...weeklyValues].forEach(entry => {
      const newValue = entry.averages === null
        ? lastValue
        : entry.averages.filter(average => average.id === 'average')[0].average
      totalImprovements.push({
        week: entry.week,
        average: ((newValue / firstValue) - 1 ).toFixed(2)

      })
      lastValue = newValue
    })
  return totalImprovements
}


const convertIds = (userIds) => {
  let newIds = []
  for (let i = 0; i < userIds.length; i++) {
    const originalId = userIds[i]
    const newId = i + 1
    const keyValuePair = {
      originalId: originalId,
      newId: newId
    }
    newIds = [...newIds, keyValuePair]
  }
  return newIds
}

module.exports = { findWeeklyValues, findWeeklyImprovement, findTotalImprovement }