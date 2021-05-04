/**.
 * Controller for variable improvement database queries
 *
 * @module backend/controllers/improvementController
 * @requires date-fns
 * @requires backend/models/index
 * @requires backend/controllers/controller
 * @requires backend/controllers/filters
 */

const { addDays } = require('date-fns')
const controller = require('./controller')
const db = require('../models')
const user_moods = db.user_moods
const { addDateFilterToQuery } = require('./filters')

/**.
 * Return weekly values with given parameters/filters
 *
 * @param {*} organisation - Organisation name/code for filtering
 * @param {*} withCaregiver - Specifies whether data should be filtered to only users with caregiver
 * @param {*} startDate - time filtering start date
 * @param {*} endDate - time filtering end date
 * @param {*} variable - variable indicating which data is queried
 * @param {*} byUsingPeriod - variable indicating week by date or using period
 * @returns {...any} - computed and modified data of given variable, with possible filters
 */
const findWeeklyValues = async (organisation, withCaregiver, startDate, endDate, variable, byUsingPeriod) => {

  if (variable === 'MOOD') {
    let userMoodData = []
    let moodsWeekly = []

    const userIds = await controller.findAllUsers(organisation, withCaregiver)

    let weeklyValuesQuery = {
      attributes: ['id', 'user_id', 'created_at', 'value'],
      order: [
        ['created_at', 'ASC'],
        ['user_id', 'ASC']
      ],
      where: {
        user_id: userIds.map(user => user.user_id)
      }
    }

    weeklyValuesQuery = addDateFilterToQuery(weeklyValuesQuery, startDate, endDate)
    userMoodData = await user_moods.findAll(weeklyValuesQuery)
    moodsWeekly = await findWeeklyMoods(userMoodData, byUsingPeriod)

    return moodsWeekly
  } else {
    return null
    // TO DO: implement bdi and phq-9 variables
  }
}

/**.
 * Function for modifying and calculating data when variable is mood
 *
 * @param {*} userMoodsData - object with data from database, with possible filtering
 * @param {*} byUsingPeriod - variable indicating week by date or using period
 * @returns {...any} - computed and modified data
 */
const findWeeklyMoods = async (userMoodsData, byUsingPeriod) => {
  return byUsingPeriod
    ? await findWeeklyMoodsByUsingPeriod(userMoodsData)
    : await findWeeklyMoodsByDate(userMoodsData)
}

/**.
 * Function for modifying and calculating data when variable is mood by date
 *
 * @param {*} userMoodsData - object with data from database, with possible filtering
 * @returns {...any} - computed and modified data
 */
const findWeeklyMoodsByDate = async (userMoodsData) => {
  if (userMoodsData.length === 0) {
    return null
  }

  const userMoods = userMoodsData.map(mood => mood.dataValues)
  const sortedTemp = userMoods.sort(compare)

  const firstCreated = sortedTemp[0].created_at.getTime()
  const first = new Date(firstCreated).setHours(0, 0, 0, 0)
  const last = (sortedTemp[userMoods.length - 1].created_at.getTime()) + 604800000

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
        averages: [{ id: 'average', average: 0 }]
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    } else {
      moodValues.sort((a, b) => (a.user_id > b.user_id) ? 1 : ((b.user_id > a.user_id) ? -1 : 0))

      let allAverages = []
      let sum = 0
      let count = 0
      let average, value

      for (let i = 0; i < moodValues.length; i++) {
        value = moodValues[i].value
        sum += value
        count++

        if (i + 1 === moodValues.length || moodValues[i].user_id !== moodValues[i + 1].user_id) {
          average = sum / count
          average = parseFloat(average.toFixed(2))
          allAverages = [...allAverages, average]
          sum = 0
          count = 0
        }
      }

      const averageSum = allAverages.reduce((a, b) => a + b, 0)
      let averageOfAverages = averageSum / allAverages.length
      averageOfAverages = parseFloat(averageOfAverages.toFixed(2))
      const averageAndId = {
        id: 'average',
        average: averageOfAverages
      }
      allAverages = [averageAndId]
      const averageValue = {
        week: weekDates,
        averages: allAverages
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    }
  }
  return valuesWeekly
}

/**.
 * Function for modifying and calculating data when variable is mood by using periods
 *
 * @param {*} userMoodsData - object with data from database, with possible filtering
 * @returns {...any} - computed and modified data
 */
const findWeeklyMoodsByUsingPeriod = async (userMoodsData) => {
  if (userMoodsData.length === 0) {
    return null
  }
  //Retrieve mood dataValues
  const userMoods = userMoodsData.map(mood => mood.dataValues)
  const sortedTemp = userMoods.sort(compare)

  //Create set of users
  const userIds = sortedTemp.map(userMood => userMood.user_id)
  const uniqueUserIds = [...new Set(userIds)]

  let weekAmount = 0
  let usageByWeeks = []

  //Retrieve amounts of weeks users have used the app
  uniqueUserIds.forEach(userId => {
    const filteredTemp = sortedTemp.filter(mood => mood.user_id === userId)
    const first_created_at = filteredTemp[0].created_at
    const last_created_at = filteredTemp[filteredTemp.length - 1].created_at
    const weeks = Math.ceil(((last_created_at - first_created_at) / 604800000))
    usageByWeeks.push(weeks)
  })

  //Max usage by weeks
  weekAmount = Math.max(...usageByWeeks)

  //Averages by using week
  let values = []
  for (let index = 0; index < weekAmount; index++) {
    values.push(0)
  }

  let usersInWeek = values.slice(0)

  //Retrieve number of users who used each week
  for (let index = 0; index < usersInWeek.length; index++) {
    usageByWeeks.forEach(weekAmount => {
      usersInWeek[index] = index > weekAmount
        ? usersInWeek[index]
        : usersInWeek[index] + 1
    })
  }

  //Retrieve average mood by week
  uniqueUserIds.forEach(userId => {
    //Filter data for current user
    const filteredTemp = sortedTemp.filter(mood => mood.user_id === userId)
    //Get first usage of the app for current user
    const first_created_at = filteredTemp[0].created_at
    let sums = []
    let lastWeek = 0
    let count = 0
    let userMoodIndex = 0
    //Get average mood by each week
    while (userMoodIndex < filteredTemp.length) {
      const userMood = filteredTemp[userMoodIndex]
      const currentWeek = Math.floor((userMood.created_at - first_created_at) / 604800000).toFixed(0)
      sums[currentWeek] = sums[currentWeek] === undefined || sums[currentWeek] === null ? 0 : sums[currentWeek]
      if (currentWeek !== lastWeek) {
        sums[lastWeek] = count === 0 ? 0 : sums[lastWeek] / count
        count = 0
        lastWeek = currentWeek
      }
      sums[currentWeek] += userMood.value
      count++
      userMoodIndex++
    }
    sums[lastWeek] = count === 0 ? 0 : sums[lastWeek] / count

    //Get averages of sums
    for (let index = 0; index < sums.length; index++) {
      values[index] += sums[index] === undefined ? 0 : sums[index] / usersInWeek[index]
    }
  })

  //Create returned objects
  let valuesWeekly = []
  for (let index = 0; index < values.length; index++) {
    valuesWeekly[index] = {
      week: [index + 1, index + 1],
      averages: [{
        id: 'average',
        average: parseFloat((values[index]).toFixed(2))
      }]
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
 * @param {boolean} byUsingPeriod - variable indicating week by date or using period
 * @returns {Array} - Mood improvement percentages and their dates in an array
 */
const findWeeklyImprovement = async (organisation, withCaregiver, startDate, endDate, variable, byUsingPeriod) => {
  const weeklyValues = await findWeeklyValues(organisation, withCaregiver, startDate, endDate, variable, byUsingPeriod)

  let lastAverage = 0
  let average = 0
  let lastValue = weeklyValues === null
    ? 0
    : [...weeklyValues][0].averages.filter(average => average.id === 'average')[0].average
  let weeklyImprovement = []
  weeklyValues === null
    ? null
    : [...weeklyValues].forEach(entry => {
      let newValue = 0

      if (entry.averages !== null && entry.averages[0].average === 0) {
        newValue = lastValue
        average = lastAverage
        weeklyImprovement.push({
          week: entry.week,
          average: average
        })
      } else {
        newValue = entry.averages === null
          ? lastValue
          : entry.averages.filter(average => average.id === 'average')[0].average

        average = (lastValue === 0 || lastValue === null)
          ? 0
          : ((newValue - lastValue) / lastValue).toFixed(2)

        weeklyImprovement.push({
          week: entry.week,
          average: average
        })
      }

      lastValue = newValue
      lastAverage = average
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
 * @param {*} byUsingPeriod - variable indicating week by date or using period
 * @returns {Array} - Mood change percentages and their dates in an array
 */
const findTotalImprovement = async (organisation, withCaregiver, startDate, endDate, variable, byUsingPeriod) => {
  const weeklyValues = await findWeeklyValues(organisation, withCaregiver, startDate, endDate, variable, byUsingPeriod)

  let firstValue = weeklyValues === null
    ? 0
    : [...weeklyValues][0].averages.filter(average => average.id === 'average')[0].average

  let lastValue = firstValue
  let totalImprovements = []
  let lastAverage = 0
  let average = 0

  weeklyValues === null
    ? null
    : [...weeklyValues].forEach(entry => {
      let newValue
      if (entry.averages !== null && entry.averages[0].average === 0) {
        newValue = lastValue
        average = lastAverage
        totalImprovements.push({
          week: entry.week,
          average: average
        })
      } else {
        const newValue = entry.averages === null
          ? lastValue
          : entry.averages.filter(average => average.id === 'average')[0].average
        average = ((newValue / firstValue) - 1).toFixed(2)
        totalImprovements.push({
          week: entry.week,
          average: average

        })
      }
      lastValue = newValue
      lastAverage = average
    })
  return totalImprovements
}

const compare = (moodA, moodB) => {
  if (moodA.created_at < moodB.created_at) {
    return -1
  }
  if (moodA.created_at > moodB.created_at) {
    return 1
  }
  return 0
}

module.exports = { findWeeklyValues, findWeeklyImprovement, findTotalImprovement, findWeeklyMoods }
