/**.
 * Tests that database controllers return correct data when filtered
 *
 * @module backend/tests/withCaregiver_test
 * @requires backend/controllers/controller
 * @requires sequelize-mock
 * @requires backend/models/index
 *
 */

// const sinon = require('sinon')

const controller = require('../controllers/controller')

// /**.
//  * Helper function for creating new Date objects
//  *
//  * @constant
//  *
//  */
// const newDates = require('./newDatesAroundLastMidnight')
// const USER_PROFILES_CREATED_AT_TIMES = newDates([-150, -100, -90, -75])
// let controllerForSinon, user_profiles_stub, db

/**.
 * Creating mock data for user_care_givers
 *
 * @memberof module:backend/tests/withCaregiver_test
 * @param {string} user_caregivers_model - user_caregivers_model
 * @param {Function} mock_function - Function that creates mock data
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
 * Creating mock data for user_profiles
 *
 * @memberof module:backend/tests/withCaregiver_test
 * @param {string} user_caregivers_model - user_profiles
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
    added_organisation: null
  })
})

/**
 * Tests for withCaregiver.
 *
 * @memberof module:backend/tests/withCaregiver_test
 * @param {string} describtion - Controller.
 * @param {Function} tests - Function that runs tests.
 */
describe('controller', () => {

  /**.
   * FindAllUsers returns correct data with caregiver filter
   *
   * @memberof module:backend/tests/withCaregiver_test
   * @inner
   * @param {string} testName - Name of the test
   * @param {Function} testFunction - Function that runs the test
   */
  test('findAllUsers returns correct data with caregiver filter', async () => {
    const allUsers = await controller.findAllUsers('ALL', true)
    expect(allUsers.length).toEqual(1)
  })
})

