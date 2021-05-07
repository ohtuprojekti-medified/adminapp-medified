/**.
 * Tests for requests to backend when no token is present
 *
 * @module backend/tests/noToken_test
 * @requires mongoose
 * @requires supertest
 * @requires backend/app
 */

/**.
 * Used to make requests to the backend
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/noToken_test
 */
const mongoose = require('mongoose')

/**.
 * Used to create backend for tests
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/noToken_test
 */
const supertest = require('supertest')

/**.
 * The backend of the app
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/noToken_test
 */
const app = require('../app')

/**.
 * Api for tests created with supertest
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/noToken_test
 */
const api = supertest(app)

/**.
 * Url for api requests
 *
 * @constant
 * @type {string}
 * @memberof module:backend/tests/noToken_test
 */
const apiUrl = '/api'


/**.
 * Run tests for noToken requests
 *
 * @type {object}
 * @memberof module:backend/tests/noToken_test
 * @param {string} description - noToken tests
 * @param {Function} tests - Function that runs tests
 */
describe('noToken tests', () => {

  /**.
 * Tests that weekly mood averages are not returned without token
 *
 * @memberof module:backend/tests/noToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {Function} test - Test code
 */
  test('weekly mood averages are not returned without token', async () => {
    await api.get(apiUrl + '/weeklyvalue')
      .expect(403)
  })

  /**.
   * Tests that weekly improvement averages are not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('weekly improvement averages are not returned without token', async () => {
    await api.get(apiUrl + '/weeklyimprovement')
      .expect(403)
  })

  /**.
   * Tests that users are not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('users are not returned without token', async () => {
    await api.get(apiUrl + '/users')
      .expect(403)
  })

  /**.
   * Tests that caregivers are not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('caregivers are not returned without token', async () => {
    await api.get(apiUrl + '/caregivers')
      .expect(403)
  })

  /**.
   * Tests that ping is not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('ping is not returned without token', async () => {
    await api.get(apiUrl + '/ping')
      .expect(403)
  })

  /**.
   * Tests that cumulative amount of users is not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('cumulative amount of users is not returned without token', async () => {
    await api.get(apiUrl + '/cumulative')
      .expect(403)
  })

  /**.
   * Tests that activeusers are not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('active users are not returned without token', async () => {
    await api.get(apiUrl + '/activeusers')
      .expect(403)
  })

  /**.
   * Tests that newusers are not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('new users are not returned without token', async () => {
    await api.get(apiUrl + '/newusers')
      .expect(403)
  })

  /**.
   * Tests that user activity today is not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('user activity today is not returned without token', async () => {
    await api.get(apiUrl + '/activitytoday')
      .expect(403)
  })

  /**.
   * Tests that retention rate is not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('retention rate is not returned without token', async () => {
    await api.get(apiUrl + '/retention')
      .expect(403)
  })

  /**.
   * Tests that average retention rate is not returned without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('average retention rate is not returned without token', async () => {
    await api.get(apiUrl + '/avgretention')
      .expect(403)
  })

  /**.
   * Tests that unknown url returns 403 without token
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('unknown url returns 403 without token', async () => {
    await api.get(apiUrl + '/unknownurl')
      .expect(403)
  })

  /**.
   * Close connection after all tests have been executed
   *
   * @memberof module:backend/tests/noToken_test
   * @inner
   * @param {Function} functionAfterAll - Function to be executed after all tests
   */
  afterAll(() => mongoose.connection.close())
})