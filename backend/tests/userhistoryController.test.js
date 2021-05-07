/**.
 * Tests for userhistoryController
 *
 * @module backend/tests/userhistoryController_test
 * @requires sinon
 * @requires backend/tests/newDatesAroundLastMidnight
 * @requires date-fns
 * @requires backend/models/index
 * @requires backend/controllers/userhistoryController
 */

/**.
 * Mocks data for models
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/userhistoryController_test
 */
const sinon = require('sinon')
let userhistoryController, db, user_activities_stub, user_profiles_stub

/**.
 * Helper function for creating new Date objects
 *
 * @constant
 * @function
 * @memberof module:backend/tests/userhistoryController_test
 */
const newDates = require('./newDatesAroundLastMidnight')

const { format } = require('date-fns')
const TIMES = newDates([-46.2, -39.2, -32.2, -25.2, -17.5, -7])
const USER_PROFILES_CREATED_AT_TIMES = newDates([-150, -100, -90, -75])

/**.
 * Creates userhistoryController with mock data
 *
 * @constant
 * @function
 * @memberof module:backend/tests/userhistoryController_test
 * @returns {object} - userhistoryController with mock data
 */
const userhistoryControllerMocked = () => {
  db = require('../models')

  user_activities_stub = sinon.stub(db.user_activities, 'findAll')
    .callsFake(() => {
      return [
        {
          dataValues: {
            id: 21,
            user_id: 'user21',
            created_at: TIMES[0]
          }
        },
        {
          dataValues: {
            id: 22,
            user_id: 'user21',
            created_at: TIMES[1]
          }
        },
        {
          dataValues: {
            id: 23,
            user_id: 'user21',
            created_at: TIMES[2]
          }
        },
        {
          dataValues: {
            id: 24,
            user_id: 'user21',
            created_at: TIMES[3]
          }
        },
        {
          dataValues: {
            id: 25,
            user_id: 'user21',
            created_at: TIMES[4]
          }
        },
        {
          dataValues: {
            id: 26,
            user_id: 'user21',
            created_at: TIMES[5]
          }
        },
        {
          dataValues: {
            id: 27,
            user_id: 'user22',
            created_at: TIMES[0]
          }
        },
        {
          dataValues: {
            id: 28,
            user_id: 'user22',
            created_at: TIMES[1]
          }
        },
        {
          dataValues: {
            id: 29,
            user_id: 'user22',
            created_at: TIMES[2]
          }
        },
        {
          dataValues: {
            id: 30,
            user_id: 'user22',
            created_at: TIMES[3]
          }
        }
      ]
    })
  user_profiles_stub = sinon.stub(db.user_profiles, 'findAll')
    .callsFake(() => {
      return [{
        dataValues: {
          user_id: 'user21',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Matti',
          last_name: 'Ittam',
          added_organisation: 'OHTU',
          created_at: USER_PROFILES_CREATED_AT_TIMES[0]
        }
      },
      {
        dataValues: {
          user_id: 'user22',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Maija',
          last_name: 'Ajiam',
          added_organisation: 'OHTU',
          created_at: USER_PROFILES_CREATED_AT_TIMES[1]
        }
      },
      {
        dataValues: {
          user_id: 'user23',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Mikko',
          last_name: 'Mallikas',
          added_organisation: 'OHTU',
          created_at: USER_PROFILES_CREATED_AT_TIMES[2]
        }
      },
      {
        dataValues: {
          user_id: 'user24',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Teppo',
          last_name: 'Oppet',
          added_organisation: 'OHTU',
          created_at: USER_PROFILES_CREATED_AT_TIMES[3]
        }
      }]
    })
  userhistoryController = require('../controllers/userhistoryController')
  return userhistoryController

}

/**.
 * Run tests for userhistory controller
 *
 * @memberof module:backend/tests/userhistoryController_test
 * @param {string} description - userhistory controller
 * @returns {object} - Function that runs tests
 */
describe('userhistory controller', () => {
  /**.
   * Code to be run before each test
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {Function} beforeEachCode - beforeEach code
   */
  beforeEach(() => {
    userhistoryController = userhistoryControllerMocked()
  })

  /**.
   * Tests that userhistory controller findCumulativeNewUser returns correct data
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findCumulativeNewUsers returns correct data', async () => {
    const cumulativeUserActivities = await userhistoryController.findCumulativeNewUsers('ALL')
    expect(cumulativeUserActivities[0].entries).toEqual(1)
    expect(cumulativeUserActivities[1].entries).toEqual(1)
  })

  /**.
   * Tests that userhistory controller findUserActivities returns correct data
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findUserActivities returns correct data', async () => {
    const activeUsers = await userhistoryController.findActiveUsers('ALL')
    expect(activeUsers[0].entries).toEqual(1)
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(1)
  })

  /**.
   * Tests that userhistory controller findUserActivities returns correct data within timeframe where all users are partially active

   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findActiveUsers returns correct data within timeframe where users are partially active', async () => {
    const activeUsers = await userhistoryController.findActiveUsers('ALL', false, format(TIMES[1], 'yyyy-MM-dd'), format(TIMES[5], 'yyyy-MM-dd'))
    expect(activeUsers[0].entries).toEqual(1)
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(1)
  })

  /**.
   * Tests that userhistory controller findUserActivities returns correct data within timeframe where all users are active
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findActiveUsers returns correct data within timeframe where all users are active', async () => {
    const activeUsers = await userhistoryController.findActiveUsers('ALL', false, format(TIMES[2], 'yyyy-MM-dd'), format(TIMES[5], 'yyyy-MM-dd'))
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(1)
  })

  /**.
   * Tests that findActiveUsers returns correct data within timeframe where 2 users are active
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findActiveUsers returns correct data within timeframe where 2 users are active', async () => {
    const activeUsers = await userhistoryController.findActiveUsers('ALL', false, format(TIMES[2], 'yyyy-MM-dd'), format(TIMES[5], 'yyyy-MM-dd'))
    expect(activeUsers[0].entries).toEqual(1)
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(1)
  })

  /**.
   * Tests that findCumulativeNewUsers return correct data with start date filter
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findCumulativeNewUsers return correct data with start date filter', async () => {
    const cumulativeNewUsers = await userhistoryController.findCumulativeNewUsers('ALL', false, format(USER_PROFILES_CREATED_AT_TIMES[2], 'yyyy-MM-dd'), '')
    expect(cumulativeNewUsers[0].entries).toEqual(1)
    expect(cumulativeNewUsers[cumulativeNewUsers.length - 1].entries).toEqual(4)
  })

  /**.
   * Tests that findCumulativeNewUsers return correct data with end date filter
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findCumulativeNewUsers return correct data with end date filter', async () => {
    const cumulativeNewUsers = await userhistoryController.findCumulativeNewUsers('ALL', false, '', format(USER_PROFILES_CREATED_AT_TIMES[2], 'yyyy-MM-dd'))
    expect(cumulativeNewUsers[0].entries).toEqual(1)
    expect(cumulativeNewUsers[cumulativeNewUsers.length - 1].entries).toEqual(4)
  })

  /**.
   * Tests that findCumulativeNewUsers return correct data with start date and end date filter
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('findCumulativeNewUsers return correct data with start date and end date filter', async () => {
    const cumulativeNewUsers = await userhistoryController.findCumulativeNewUsers('ALL', false, format(USER_PROFILES_CREATED_AT_TIMES[1], 'yyyy-MM-dd'), format(USER_PROFILES_CREATED_AT_TIMES[2], 'yyyy-MM-dd'))
    expect(cumulativeNewUsers[0].entries).toEqual(1)
    expect(cumulativeNewUsers[cumulativeNewUsers.length - 1].entries).toEqual(4)
  })

  /**.
   * Code to be run after each test
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {Function} afterEachCode - afterEach code
   */
  afterEach(() => {
    user_activities_stub.restore()
    user_profiles_stub.restore()
  })
})

const controller = require('../controllers/userhistoryController')

/**.
 * Creating mock data for user_activities
 *
 * @memberof module:backend/tests/userhistoryController_test
 * @param {string} user_activities_model - user_activities_model
 * @param {Function} mock_function - Function that creates mock data
 */
jest.mock('../models/user_activities', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_activities', {
    id: 87,
    user_id: 'fdd8sklla'
  })
})

/**.
 * Run tests for user_activities today
 *
 * @memberof module:backend/tests/userhistoryController_test
 * @param {string} description - user_activities today
 * @param {Function} tests - Function that runs tests
 */
describe('user_activities today', () => {
  /**.
   * Tests that user_activities today are returned correctly
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  it('are returned correctly', async () => {
    const activitiesToday = await controller.findUserActivitiesToday('ALL')
    const createdAt = (activitiesToday[0].createdAt).setHours(0, 0, 0)
    const timeNow = new Date().setHours(0, 0, 0, 0)
    expect(activitiesToday.length).toEqual(1)
    expect(createdAt - timeNow).toBeLessThan(1000)
  })
})

/**.
 * Creating mock data for user_profiles
 *
 * @memberof module:backend/tests/userhistoryController_test
 * @param {string} user_profiles_model - user_profiles_model
 * @param {Function} mock_function - Function that creates mock data
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
    added_organisation: 'OHTU'
  })
})

/**.
 * Run tests for new users from the last seven days
 *
 * @memberof module:backend/tests/userhistoryController_test
 * @param {string} description - new users from the last seven days
 * @param {Function} tests - Function that runs tests
 */
describe('new users from the last seven days', () => {
  /**.
   * Tests that new users from the last seven days are returned correctly
   *
   * @memberof module:backend/tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  it('are returned correctly', async () => {
    const newUsers = await controller.findNewUsers('ALL')
    const createdAt = (newUsers[0].createdAt).setHours(0, 0, 0)
    const timeNow = new Date().setHours(0, 0, 0, 0)
    expect(newUsers.length).toEqual(1)
    expect(createdAt - timeNow).toBeLessThan(1000)
  })
})