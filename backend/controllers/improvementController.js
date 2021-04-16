const { addDays } = require('date-fns')
const db = require('../models')
const user_moods = db.user_moods

const findImprovements = async (organisation, withCaregiver, variable) => {

  if (variable === 'MOOD') {
    // TODO implement variable for request
  }

  const userMoodsData = await user_moods.findAll({
    order: [
      ['created_at', 'ASC'],
      ['user_id', 'ASC']
    ],
    attributes: ['id', 'user_id', 'created_at', 'value']
  })

  const userMoods = userMoodsData.map(mood => mood.dataValues)

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

  // Count average moods
  let weekDates
  let valuesWeekly = []
  for (let i = 0; i < weeklyMoods.length; i++) {
    weekDates = weeklyMoods[i].week
    let moodValues = weeklyMoods[i].values

    if (moodValues.length === 0) {
      const averageValue = {
        week: weekDates,
        average: null
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    } else if (moodValues.length === 1) {
      const averageValue = {
        week: weekDates,
        average: [moodValues[0].value, moodValues[0].value]
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
          averages = [...averages, average]
          sum = 0
          count = 0
        } else if (moodValues[i].user_id !== moodValues[i + 1].user_id) {
          average = sum / count
          average = parseFloat(average.toFixed(2))
          averages = [...averages, average]
          sum = 0
          count = 0
        }

      }
      const averageSum = averages.reduce((a, b) => a + b, 0)
      let averageOfAverages = averageSum / averages.length
      averageOfAverages = parseFloat(averageOfAverages.toFixed(2))
      averages = [...averages, averageOfAverages]
      const averageValue = {
        week: weekDates,
        average: averages
      }
      valuesWeekly = [...valuesWeekly, averageValue]
    }
  }

  // let totalMoodImprovements
  // let weeklyMoodImprovements

  if (organisation === 'ALL') {
    // admin request for all data
    if (withCaregiver === true) {
      // TO DO filtered
    } else {
      // TODO not filtered
    }
  } else {
    // TO DO organisational data
  }


  // To do BDI and PHQ-9
  return valuesWeekly
}

// TODO USER ID CONVERTER?

module.exports = { findImprovements }