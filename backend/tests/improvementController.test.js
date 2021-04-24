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

jest.mock('../models/user_care_givers', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_care_givers', {
    user_id: '1a2b3c',
    access_code_id: 'acc1',
    created_at: new Date(),
    updated_at: new Date(),
    consent: true
  })
})

jest.mock('../models/user_profiles', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_profiles', {
    user_id: '1a2b3c',
    height: '',
    weight: '',
    sex: null,
    birth_date: null,
    first_name: 'Mikko',
    last_name: 'Mallikas',
    added_organisation: null
  })
})

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
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', false, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 2.67, id: 1 }, { average: 5.5, id: 2 }, { average: 4.08, id: 'average' }])
  })

  test('findWeeklyValues with caregivers returns correct data for moods', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', true, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 2.67, id: 1 }, { average: 5.5, id: 2 }, { average: 4.08, id: 'average' }])
  })

  test('findWeeklyValues returns null if variable is not mood', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', false, null, null, 'NOTMOOD')
    expect(weeklyMoods).toEqual(null)
  })
  test('findWeeklyImprovement returns correct data for moods', async () => {
    const weeklyImprovement = await improvementController.findWeeklyImprovement('ALL', false, null, null, 'MOOD')
    expect(weeklyImprovement.length).toEqual(5)
    expect(weeklyImprovement[1].average).toEqual('-0.02')
  })

  test('findWeeklyMoods return null if userMoodsData is empty', async () => {
    const weeklyMoods = await improvementController.findWeeklyMoods([])
    expect(weeklyMoods).toEqual(null)
  })


  afterEach(() => {
    user_moods_stub.restore()
  })
})