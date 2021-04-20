/**.
 * Tests for userhistoryController
 *
 * @module tests/userhistoryController_test
 * @requires sinon
 * @requires newDatesAroundLastMidnight
 * @requires ../models
 * @requires ../controllers/userhistoryController
 */

/**.
 * Mocks data for models
 *
 * @type {object}
 * @constant
 * @namespace sinon
 */
const sinon = require('sinon')
let userhistoryController, db, user_activities_stub, user_profiles_stub

/**.
 * Helper function for creating new Date objects
 *
 * @constant
 * @function
 */
const newDates = require('./newDatesAroundLastMidnight')

// const TIME6 = new Date(new Date() - 604800000)
// const TIME5 = new Date(new Date() - 1512000010)
// const TIME4 = new Date(new Date() - 2177280020)
// const TIME3 = new Date(new Date() - 2782080030)
// const TIME2 = new Date(new Date() - 3386880040)
// const TIME1 = new Date(new Date() - 3991680050)
const TIMES1 = newDates([-46.2, -39.2, -32.2, -25.2, -17.5, -7])
const TIMES2 = newDates([-25.4, -17.6, -7])

/**.
 * Creates userhistoryController with mock data
 *
 * @constant
 * @function
 * @memberof module:tests/userhistoryController_test
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
            created_at: TIMES1[0]
          }
        },
        {
          dataValues: {
            id: 22,
            user_id: 'user21',
            created_at: TIMES1[1]
          }
        },
        {
          dataValues: {
            id: 23,
            user_id: 'user21',
            created_at: TIMES1[2]
          }
        },
        {
          dataValues: {
            id: 24,
            user_id: 'user21',
            created_at: TIMES1[3]
          }
        },
        {
          dataValues: {
            id: 25,
            user_id: 'user21',
            created_at: TIMES1[4]
          }
        },
        {
          dataValues: {
            id: 26,
            user_id: 'user21',
            created_at: TIMES1[5]
          }
        },
        /**{
          dataValues: {
            id: 27,
            user_id: 'user22',
            created_at: TIMES1[6]
          }
        },*/
        {
          dataValues: {
            id: 28,
            user_id: 'user22',
            created_at: TIMES1[0]
          }
        },
        {
          dataValues: {
            id: 29,
            user_id: 'user22',
            created_at: TIMES1[2]
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
          created_at: TIMES2[0]
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
          created_at: TIMES2[1]
        }
      },
      {
        dataValues: {
          user_id: 'user_23',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Mikko',
          last_name: 'Mallikas',
          added_organisation: 'OHTU',
          created_at: TIMES2[2]
        }
      }]
    })
  userhistoryController = require('../controllers/userhistoryController')
  return userhistoryController

}

/**.
 * Run tests for userhistory controller
 *
 * @function
 * @memberof module:tests/userhistoryController_test
 * @param {string} description - userhistory controller
 * @returns {object} - Function that runs tests
 */
describe('userhistory controller', () => {
  /**.
   * Code to be run before each test
   *
   * @name beforeEach
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {object} beforeEachCode - beforeEach code
   */
  beforeEach(() => {
    userhistoryController = userhistoryControllerMocked()
  })

  /**.
   * Tests that userhistory controller findCumulativeNewUser returns correct data
   *
   * @name userhistory_controller_findCumulativeNewUser_returns_correct_data
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  test('findCumulativeNewUsers returns correct data', async () => {
    const cumulativeUserActivities = await userhistoryController.findCumulativeNewUsers('ALL')
    expect(cumulativeUserActivities[0].entries).toEqual(2)
    expect(cumulativeUserActivities[1].entries).toEqual(3)
  })

  /**.
   * Tests that userhistory controller findUserActivities returns correct data
   *
   * @name userhistory_controller_findUserActivities_returns_correct_data
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  test('findUserActivities returns correct data', async () => {
    const activeUsers = await userhistoryController.findActiveUsers('ALL')
    expect(activeUsers[0].entries).toEqual(1)
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(2)
  })

  /**.
   * Tests that userhistory controller findUserActivities returns correct data within timeframe where all users are partially active
   *
   * @name userhistory_controller_findUserActivities_returns_correct_data_within_timeframe_where_all_users_are_partially_active
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  test('findActiveUsers returns correct data within timeframe where all users are partially active', async () => {
    const activeUsers = await userhistoryController.findActiveUsers('ALL', false, TIMES1[1], TIMES1[5])
    expect(activeUsers[0].entries).toEqual(1)
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(2)
  })

  /**.
   * Tests that userhistory controller findUserActivities returns correct data within timeframe where all users are active
   *
   * @name userhistory_controller_findUserActivities_returns_correct_data_within_timeframe_where_all_users_are_active
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  test('findActiveUsers returns correct data within timeframe where all users are active', async () => {
    console.log('all users are active')
    const activeUsers = await userhistoryController.findActiveUsers('ALL', false, TIMES1[2], TIMES1[5])
    expect(activeUsers[activeUsers.length - 1].entries).toEqual(2)
  })

  /**.
   * Code to be run after each test
   *
   * @name afterEach
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {object} afterEachCode - afterEach code
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
 * @type {object}
 * @function
 * @memberof module:tests/userhistoryController_test
 * @param {string} user_activities_model - user_activities_model
 * @param {object} mock_function - Function that creates mock data
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
 * @type {object}
 * @function
 * @memberof module:tests/userhistoryController_test
 * @param {string} description - user_activities today
 * @param {object} tests - Function that runs tests
 */
describe('user_activities today', () => {
  /**.
   * Tests that user_activities today are returned correctly
   *
   * @name user_activities_today_are_returned_correctly
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
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
 * @type {object}
 * @function
 * @memberof module:tests/userhistoryController_test
 * @param {string} user_profiles_model - user_profiles_model
 * @param {object} mock_function - Function that creates mock data
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
 * @type {object}
 * @function
 * @memberof module:tests/userhistoryController_test
 * @param {string} description - new users from the last seven days
 * @param {object} tests - Function that runs tests
 */
describe('new users from the last seven days', () => {
  /**.
   * Tests that new users from the last seven days are returned correctly
   *
   * @name new_users_from_the_last_seven_days_are_returned_correctly
   * @function
   * @memberof module:tests/userhistoryController_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('are returned correctly', async () => {
    const newUsers = await controller.findNewUsers('ALL')
    const createdAt = (newUsers[0].createdAt).setHours(0, 0, 0)
    const timeNow = new Date().setHours(0, 0, 0, 0)
    expect(newUsers.length).toEqual(1)
    expect(createdAt - timeNow).toBeLessThan(1000)
  })
})