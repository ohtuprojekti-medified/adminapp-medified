/**
 * Tests for requests to backend when no token is present
 *
 * @module noToken_test
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
 * Tests that users are not returned without token
 *
 * @name no_users_without_token
 * @function
 * @memberof module:noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('users are not returned without token', async () => {
  await api.get('/api/users')
    .expect(403)
})

/**
 * Close connection after all tests have been executed
 *
 * @name afterAll
 * @function
 * @memberof module:noToken_test
 * @inner
 * @param {object} functionAfterAll - Function to be executed after all tests
 */
afterAll(() => mongoose.connection.close())