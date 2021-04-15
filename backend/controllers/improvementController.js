const db = require('../models')
const user_moods = db.user_moods

const findImprovements = async (organisation, withCaregiver, variable) => {

  if (variable === 'MOOD') {
    // let weeklyMoods

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
  }

  // To do BDI and PHQ-9
  return null
}

module.exports = { findImprovements }