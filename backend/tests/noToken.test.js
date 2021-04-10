/**
 * Tests for requests to backend when no token is present
 *
 * @module tests/noToken_test
 * @requires mongoose
 * @requires supertest
 * @requires app
 */

/**
 * Used to make requests to the backend
 *
 * @type {object}
 * @constant
 * @namespace mongoose
 */
const mongoose = require('mongoose')

/**
 * Used to create backend for tests
 *
 * @type {object}
 * @constant
 * @namespace supertest
 */
const supertest = require('supertest')

/**
 * The backend of the app
 *
 * @type {object}
 * @constant
 * @namespace app
 */
const app = require('../app')

/**
 * Api for tests created with supertest
 *
 * @type {object}
 * @constant
 * @namespace api
 */
const api = supertest(app)

/**
 * Url for api requests
 *
 * @constant
 * @type {string}
 */
const apiUrl = '/api'

/**
 * Tests that users are not returned without token
 *
 * @name no_users_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('users are not returned without token', async () => {
  await api.get(apiUrl + '/users')
    .expect(403)
})

/**
 * Tests that caregivers are not returned without token
 *
 * @name no_caregivers_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('caregivers are not returned without token', async () => {
  await api.get(apiUrl + '/caregivers')
    .expect(403)
})

/**
 * Tests that ping is not returned without token
 *
 * @name no_ping_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('ping is not returned without token', async () => {
  await api.get(apiUrl + '/ping')
    .expect(403)
})

/**
 * Tests that cumulative amount of users is not returned without token
 *
 * @name no_cumulative_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('cumulative amount of users is not returned without token', async () => {
  await api.get(apiUrl + '/cumulative')
    .expect(403)
})

/**
 * Tests that activeusers are not returned without token
 *
 * @name no_activeusers_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('active users are not returned without token', async () => {
  await api.get(apiUrl + '/activeusers')
    .expect(403)
})

/**
 * Tests that newusers are not returned without token
 *
 * @name no_newusers_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('new users are not returned without token', async () => {
  await api.get(apiUrl + '/newusers')
    .expect(403)
})

/**
 * Tests that user activity today is not returned without token
 *
 * @name no_activitytoday_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('user activity today is not returned without token', async () => {
  await api.get(apiUrl + '/activitytoday')
    .expect(403)
})

/**
 * Tests that retention rate is not returned without token
 *
 * @name no_retention_rate_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('retention rate is not returned without token', async () => {
  await api.get(apiUrl + '/retention')
    .expect(403)
})

/**
 * Tests that average retention rate is not returned without token
 *
 * @name no_average_retention_rate_without_token
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('average retention rate is not returned without token', async () => {
  await api.get(apiUrl + '/avgretention')
    .expect(403)
})

/**
 * Close connection after all tests have been executed
 *
 * @name afterAll
 * @function
 * @memberof module:tests/noToken_test
 * @inner
 * @param {object} functionAfterAll - Function to be executed after all tests
 */
afterAll(() => mongoose.connection.close())