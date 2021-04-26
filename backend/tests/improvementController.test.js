/**.
 * Tests for improvementController
 *
 * @module tests/improvementController_test
 * @requires sinon
 * @requires newDatesAroundLastMidnight
 * @requires ../models
 * @requires ../controllers/improvementController
 */

/**.
 * Mocks data for models
 *
 * @type {object}
 * @constant
 * @namespace sinon
 */
const sinon = require('sinon')
let improvementController, db, user_moods_stub

/**.
 * Helper function for creating new Date objects
 *
 * @constant
 * @function
 */
const newDates = require('./newDatesAroundLastMidnight')

/**.
 * Created improvementController with mock data
 *
 * @constant
 * @function
 * @memberof module:tests/improvementController_test
 * @inner
 * @returns {object} - improvementController with mock data
 */
const improvementControllerMocked = () => {
  db = require('../models')
  const TIMES1 = newDates([-46.7, -43.6, -40.5, -37.4, -20.6, -15.9])

  user_moods_stub = sinon.stub(db.user_moods, 'findAll')
    .callsFake(() => {
      return [
        {
          dataValues: {
            id: '1',
            user_id: 'user21',
            created_at: TIMES1[0],
            value: 5
          }
        },
        {
          dataValues: {
            id: '2',
            user_id: 'user21',
            created_at: TIMES1[1],
            value: 2
          }
        },
        {
          dataValues: {
            id: '3',
            user_id: 'user21',
            created_at: TIMES1[2],
            value: 1
          }
        },
        {
          dataValues: {
            id: '4',
            user_id: 'user21',
            created_at: TIMES1[3],
            value: 4
          }
        },
        {
          dataValues: {
            id: '5',
            user_id: 'user21',
            created_at: TIMES1[4],
            value: 10
          }
        },
        {
          dataValues: {
            id: '6',
            user_id: 'user21',
            created_at: TIMES1[5],
            value: 6
          }
        },
        {
          dataValues: {
            id: '7',
            user_id: 'user22',
            created_at: TIMES1[0],
            value: 5
          }
        },
        {
          dataValues: {
            id: '8',
            user_id: 'user22',
            created_at: TIMES1[1],
            value: 6
          }
        },
      ]
    })
  improvementController = require('../controllers/improvementController')
  return improvementController
}

/**.
 * Run tests for improvement controller
 *
 * @constant
 * @function
 * @memberof module:tests/improvementController_test
 * @inner
 * @param {string} description - improvement controller
 * @returns {object} - Function that runs tests
 */
describe('improvement controller', () => {
  beforeEach(() => {
    improvementController = improvementControllerMocked()
  })

  test('findWeeklyValues returns correct data for moods', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', null, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 2.67, id: 1 }, { average: 5.5, id: 2 }, { average: 4.08, id: 'average' }])
  })

  test('findTotalImprovement returns correct data for moods', async () => {
    const totalImprovement = await improvementController.findTotalImprovement('ALL', null, null, null, 'MOOD')
    expect(totalImprovement.length).toEqual(5)
    expect(totalImprovement[0].average).toEqual('0.00')
    expect(totalImprovement[2].average).toEqual('-0.02')
  })

  afterEach(() => {
    user_moods_stub.restore()
  })
})