/**.
 * Tests for authenticateToken middleware
 *
 * @module backend/tests/authenticateToken_test
 * @requires node-mocks-http
 * @requires sinon
 * @requires backend/utils/middleware
 */

/**.
 * Mocks for request and response in express
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/authenticateToken_test
 */
const mocks = require('node-mocks-http')

/**.
 * Mock for next-function in express
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/authenticateToken_test
 */
const sinon = require('sinon')
let authenticateToken
let mockReq, mockRes, mockNext

/**.
 * Run tests for authenticateToken
 *
 * @memberof module:backend/tests/authenticateToken_test
 * @param {string} description - user_profiles
 * @param {Function} tests - Function that runs tests
 */
describe('authenticateToken tests', () => {

  /**.
   * Restore authenticateToken and mocks before each test
   *
   * @memberof module:backend/tests/authenticateToken_test
   * @inner
   * @param {Function} functionBeforeEach - Function to be executed before each test
   */
  beforeEach(() => {
    authenticateToken = require('../utils/middleware').authenticateToken
    mockRes = mocks.createResponse()
    mockNext = sinon.spy()
  })

  /**.
   * Tests that middleware doesn't allow access without token
   *
   * @memberof module:backend/tests/authenticateToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('authenticateToken does not call next when no token', async () => {
    mockReq = mocks.createRequest()
    authenticateToken(mockReq, mockRes, mockNext)
    expect(mockNext.called).toBe(false)
  })

  /**.
   * Tests that middleware doesn't allow access with fake token
   *
   * @memberof module:backend/tests/authenticateToken_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('authenticateToken does not call next when token is fake', async () => {
    mockReq = mocks.createRequest({
      headers: {
        Authorization: 'Bearer abc123'
      }
    })
    authenticateToken(mockReq, mockRes, mockNext)
    expect(mockNext.called).toBe(false)
  })
})