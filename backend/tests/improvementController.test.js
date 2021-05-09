/**.
 * Tests for improvementController
 *
 * @module backend/tests/improvementController_test
 * @requires sinon
 * @requires backend/tests/newDatesAroundLastMidnight
 * @requires backend/models/index
 * @requires backend/controllers/improvementController
 */

/**.
 * Mocks data for models
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/improvementController_test
 */
const sinon = require('sinon')
let improvementController, db, user_moods_stub

/**.
 * Helper function for creating new Date objects
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/improvementController_test
 */
const newDates = require('./newDatesAroundLastMidnight')

/**.
 * Created improvementController with mock user_care_givers data
 *
 * @constant
 * @param {string} model - user_care_givers
 * @param {Function} mockFunction - Mock function
 * @memberof module:backend/tests/improvementController_test
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

/**.
 * Created improvementController with mock user_profiles data
 *
 * @constant
 * @param {string} model - user_profiles
 * @param {Function} mockFunction - Mock function
 * @memberof module:backend/tests/improvementController_test
 * @returns {object} - improvementController with mock data
 */
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
    added_organisation: 'Yritys'
  })
})

/**.
 * Created improvementController with mock organisations data
 *
 * @constant
 * @param {string} model - organisations
 * @param {Function} mockFunction - Mock function
 * @memberof module:backend/tests/improvementController_test
 * @returns {object} - improvementController with mock data
 */
jest.mock('../models/organisations', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('organisations', {
    id: '11',
    user_id: '11',
    organisation_id: 'Yritys',
    created_at: new Date(),
    updated_at: new Date()
  })
})

/**.
 * Created improvementController with mock access_codes data
 *
 * @constant
 * @param {string} model - access_codes
 * @param {Function} mockFunction - Mock function
 * @memberof module:backend/tests/improvementController_test
 * @returns {object} - improvementController with mock data
 */
jest.mock('../models/access_codes', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('access_codes', {
    id: '11',
    user_id: '11',
    organisation_id: 'Yritys',
    created_at: new Date(),
    updated_at: new Date()
  })
})
/**
 * Function for creating improvement controller with mock values.
 *
 * @constant
 * @function
 * @memberof module:backend/tests/improvementController_test
 * @returns {object} - Improvement controller with mock values.
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
 * @memberof module:backend/tests/improvementController_test
 * @param {string} description - improvement controller
 * @param {Function} tests - Function that runs tests
 */
describe('improvement controller', () => {

  /**
   * Create improvement controller with mock values before each test.
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {Function} beforeEachFunction - Function before each test.
   */
  beforeEach(() => {
    improvementController = improvementControllerMocked()
  })

  /**.
   * FindWeeklyValues returns correct data for moods
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyValues returns correct data for moods
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyValues returns correct data for moods', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', false, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 4.08, id: 'average' }])
  })

  /**.
   * findWeeklyValues returns correct data for moods with byUsingPeriod enabled
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyValues returns correct data for moods with byUsingPeriod enabled
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyValues returns correct data for moods with byUsingPeriod enabled', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', null, null, null, 'MOOD', true)
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 4.08, id: 'average' }])
    expect(weeklyMoods[0].week).toEqual([1, 1])
  })

  // ***The following doesn't work. Should the date filter be brought to this test as mocked?
  // test('findWeeklyValues returns correct data for moods with dates', async () => {
  //   const TIMES2 = newDates([-48, -42])
  //   const weeklyMoods = await improvementController.findWeeklyValues('ALL', true, TIMES2[0], TIMES2[1], 'MOOD')
  //   expect(weeklyMoods.length).toEqual(5)
  //   expect(weeklyMoods[0].averages).toEqual([{ average: 3.5, id: 1 }, { average: 5.5, id: 2 }, { average: 4.5, id: 'average' }])
  // })

  /**.
   * findWeeklyValues returns correct data for moods for certain organisation with caregiver
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyValues returns correct data for moods for certain organisation with caregiver
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyValues returns correct data for moods for certain organisation with caregiver', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('Yritys', true, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 4.08, id: 'average' }])
  })

  /**.
   * findWeeklyValues returns correct data for moods for certain organisation without caregiver
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyValues returns correct data for moods for certain organisation without caregiver
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyValues returns correct data for moods for certain organisation without caregiver', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('Yritys', false, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 4.08, id: 'average' }])
  })

  /**.
   * findWeeklyValues with caregivers returns correct data for moods
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyValues with caregivers returns correct data for moods
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyValues with caregivers returns correct data for moods', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', true, null, null, 'MOOD')
    expect(weeklyMoods.length).toEqual(5)
    expect(weeklyMoods[0].averages).toEqual([{ average: 4.08, id: 'average' }])
  })

  /**.
   * findWeeklyValues returns null if variable is not mood
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyValues returns null if variable is not mood
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyValues returns null if variable is not mood', async () => {
    const weeklyMoods = await improvementController.findWeeklyValues('ALL', false, null, null, 'NOTMOOD')
    expect(weeklyMoods).toEqual(null)
  })

  /**.
   * findWeeklyImprovement returns correct data for moods
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyImprovement returns correct data for moods
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyImprovement returns correct data for moods', async () => {
    const weeklyImprovement = await improvementController.findWeeklyImprovement('ALL', false, null, null, 'MOOD')
    expect(weeklyImprovement.length).toEqual(5)
    expect(weeklyImprovement[1].average).toEqual('-0.02')
  })

  /**.
   * findWeeklyMoods return null if userMoodsData is empty
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findWeeklyMoods return null if userMoodsData is empty
   * @param {Function} testFunction - Function that runs the test
   */
  test('findWeeklyMoods return null if userMoodsData is empty', async () => {
    const weeklyMoods = await improvementController.findWeeklyMoods([])
    expect(weeklyMoods).toEqual(null)
  })

  /**.
   * findTotalImprovement returns correct data for moods
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {string} testName - findTotalImprovement returns correct data for moods
   * @param {Function} testFunction - Function that runs the test
   */
  test('findTotalImprovement returns correct data for moods', async () => {
    const totalImprovement = await improvementController.findTotalImprovement('ALL', null, null, null, 'MOOD')
    expect(totalImprovement.length).toEqual(5)
    expect(totalImprovement[0].average).toEqual('0.00')
    expect(totalImprovement[2].average).toEqual('-0.02')
  })

  /**
   * Restore user moods stube after each test.
   *
   * @memberof module:backend/tests/improvementController_test
   * @inner
   * @param {Function} afterEachFunction - Function after each test.
   */
  afterEach(() => {
    user_moods_stub.restore()
  })
})