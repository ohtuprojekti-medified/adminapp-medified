/**.
 * Tests for unknownEndpoint middleware
 *
 * @module backend/tests/unknownEndpoint_test
 * @requires node-mocks-http
 * @requires sinon
 * @requires backend/utils/middleware
 */

/**.
 * Mocks for request and response in express
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/unknownEndpoint_test
 */
const mocks = require('node-mocks-http')

/**.
 * Mock for next-function in express
 *
 * @type {object}
 * @constant
 * @memberof module:backend/tests/unknownEndpoint_test
 */
const sinon = require('sinon')
let unknownEndpoint
let mockReq, mockRes, mockNext
let mockSend

/**.
 * Run tests for unknownEndpoint
 *
 * @memberof module:backend/tests/unknownEndpoint_test
 * @param {string} description - unknownEndpoint tests
 * @returns {object} - Function that runs tests
 */
describe('unknownEndpoint tests', () => {

  /**.
   * Restore unknownEndpoint and mocks before each test
   *
   * @memberof module:backend/tests/unknownEndpoint_test
   * @inner
   * @param {Function} functionBeforeEach - Function to be executed before each test
   */
  beforeEach(() => {
    unknownEndpoint = require('../utils/middleware').unknownEndpoint
    mockReq = mocks.createRequest()
    mockSend = sinon.spy()
    mockRes = mocks.createRequest({
      status: () => {
        return {
          send: mockSend
        }
      }
    })
  })

  /**.
   * Tests that middleware responds with error
   *
   * @memberof module:backend/tests/unknownEndpoint_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('unknownEndpoint sends error', async () => {
    unknownEndpoint(mockReq, mockRes, mockNext)
    expect(mockSend.calledWith({ error: 'URL path does not match anything' })).toBe(true)
  })
})