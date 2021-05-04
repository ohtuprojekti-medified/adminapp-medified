const { Op } = require('sequelize')


/**.
 * Conditionally add date filtering to query
 *
 * @param {*} oldQuery - Query before filter
 * @param {*} startDate - Time filtering start date
 * @param {*} endDate - Time filtering end date
 * @returns {...any} - Updated query
 */
const addDateFilterToQuery = (oldQuery, startDate, endDate) => {
  if (!startDate && !endDate) return oldQuery

  let newQuery = { ...oldQuery }

  let created_at
  if (startDate && endDate) {
    created_at = { [Op.between]: [startDate, endDate] }
  } else if (startDate) {
    created_at = { [Op.gte]: startDate }
  } else if (endDate) {
    created_at = { [Op.lte]: endDate }
  }

  newQuery.where = { ...newQuery.where, created_at }
  return newQuery
}
}

module.exports = {
  addDateFilterToQuery
}