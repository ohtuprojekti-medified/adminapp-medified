/**.
 * Tests for filters
 *
 * @constant
 * @module backend/tests/filters_test
 * @requires backend/controllers/filters
 * @requires sequelize
 */

const { Op } = require('sequelize')
const filters = require('../controllers/filters')

const initialQuery = { where: { 'test': 1 } }

/**.
  * Run tests for date filter
  *
  * @type {object}
  * @memberof module:backend/tests/filters
  * @param {string} description - date filter
  * @param {Function} tests - Function that runs tests
  */
describe('date filter', () => {
  it('adds no filter when given no dates', async () => {
    const filteredQuery = filters.addDateFilterToQuery(initialQuery)
    expect(filteredQuery).toEqual(initialQuery)
  })

  it('adds no filter when given empty dates', async () => {
    const filteredQuery = filters.addDateFilterToQuery(initialQuery, null, null)
    expect(filteredQuery).toEqual(initialQuery)
  })

  it('adds starDate when given only startDate', async () => {
    const startDate = new Date()
    const filteredQuery = filters.addDateFilterToQuery(initialQuery, startDate, null)
    expect(filteredQuery).toEqual({
      where: {
        'test': 1,
        'created_at':{
          [Op.gte]: startDate
        }
      }
    })
  })

  it('adds endDate when given only endDate', async () => {
    const endDate = new Date()
    const filteredQuery = filters.addDateFilterToQuery(initialQuery, null, endDate)
    expect(filteredQuery).toEqual({
      where: {
        'test': 1,
        'created_at':{
          [Op.lte]: endDate
        }
      }
    })
  })

  it('adds startDate and endDate when given both', async () => {
    const startDate = new Date()
    const endDate = new Date()
    const filteredQuery = filters.addDateFilterToQuery(initialQuery, startDate, endDate)
    expect(filteredQuery).toEqual({
      where: {
        'test': 1,
        'created_at':{
          [Op.between]: [startDate, endDate]
        }
      }
    })
  })

})