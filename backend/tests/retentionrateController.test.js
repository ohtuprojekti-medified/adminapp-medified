/**
 * Tests for retentionrateController
 *
 * @module tests/retentionrateController_test
 * @requires sinon
 * @requires newDatesAroundLastMidnight
 * @requires ../models
 * @requires ../controllers/retentionrateController
 */

/**
 * Mocks data for models
 *
 * @type {object}
 * @constant
 * @namespace sinon
 */
const sinon = require('sinon')
let retentionrateController
let db
let user_activities_stub, user_profiles_stub

/**
 * Helper function for creating new Date objects
 *
 * @constant
 * @function
 */
const newDates = require('./newDatesAroundLastMidnight')

/**
 * Creates retentionrateController with mock data
 *
 * @constant
 * @function
 * @memberof module:tests/retentionrateController_test
 * @inner
 * @returns {object} - retentionrateController with mock data
 */
const retentionrateControllerMocked = () => {
  db = require('../models')
  const TIMES1 = newDates([-46.7, -39.6, -32.5, -25.4, -17.6, -7])
  const TIMES2 = newDates([-25.4, -17.6, -7])

  user_activities_stub = sinon.stub(db.user_activities, 'findAll')
    .callsFake(() => {
      return [
        {
          dataValues: {
            id: 21,
            user_id: 'user21',
            created_at: TIMES1[1]
          }
        },
        {
          dataValues: {
            id: 22,
            user_id: 'user21',
            created_at: TIMES1[2]
          }
        },
        {
          dataValues: {
            id: 23,
            user_id: 'user21',
            created_at: TIMES1[3]
          }
        },
        {
          dataValues: {
            id: 24,
            user_id: 'user21',
            created_at: TIMES1[4]
          }
        },
        {
          dataValues: {
            id: 25,
            user_id: 'user21',
            created_at: TIMES1[5]
          }
        },
        {
          dataValues: {
            id: 26,
            user_id: 'user21',
            created_at: TIMES1[6]
          }
        },
        {
          dataValues: {
            id: 27,
            user_id: 'user22',
            created_at: TIMES2[1]
          }
        },
        {
          dataValues: {
            id: 28,
            user_id: 'user22',
            created_at: TIMES2[2]
          }
        },
        {
          dataValues: {
            id: 29,
            user_id: 'user22',
            created_at: TIMES2[3]
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
          added_organisation: 'OHTU'
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
          added_organisation: 'OHTU'
        }
      }]
    })
  retentionrateController = require('../controllers/retentionrateController')
  return retentionrateController
}

/**
 * Run tests for retentionrate controller
 *
 * @constant
 * @function
 * @memberof module:tests/retentionrateController_test
 * @inner
 * @param {string} description - retentionrate controller
 * @returns {object} - Function that runs tests
 */
describe('retentionrate controller', () => {
  beforeEach(() => {
    retentionrateController = retentionrateControllerMocked()
  })

  test('findRetentionRates returns correct data', async () => {
    expect(await retentionrateController.findRetentionRates('undefined')).toEqual([{ daysUsed: 14 }])
  })

  test('findAverageRetentionRate returns correct average', async () => {
    expect(await retentionrateController.findAverageRetentionRate('undefined')).toEqual(14)
  })

  afterEach(() => {
    user_activities_stub.restore()
    user_profiles_stub.restore()
  })
})