const { Op } = require('sequelize')


const addDateFilterToQuery = (query, startDate, endDate) => {
  if (!startDate && !endDate) return

  let created_at
  if (startDate && endDate) {
    created_at = { [Op.between]: [startDate, endDate] }
  } else if (startDate) {
    created_at = { [Op.gte]: startDate }
  } else if (endDate) {
    created_at = { [Op.lte]: endDate }
  }

  query.where = { ...query.where, created_at }
}

module.exports = {
  addDateFilterToQuery
}