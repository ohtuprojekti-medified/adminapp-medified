/**
 * This is a helper function for creating new Date objects around current midnight
 *
 * @param {Array} days - Array of float multipliers for days
 * @returns {Array} - Array of days around the midnight today based on days array
 */
module.exports = days => days.map(dayAmount => new Date(new Date().setHours(0, 0, 0, 0) + dayAmount * 86400000))
