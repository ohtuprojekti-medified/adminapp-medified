/**.
 * Tests for errorHandler middleware
 *
 * @module backend/tests/errorHandler_Test
 * @requires node-mocks-http
 * @requires sinon
 * @requires backend/utils/middleware
 */

/**.
 * Mocks for request and response in express
 *
 * @type {object}
 * @constant
 */
const mocks = require('node-mocks-http')
/**.
 * Mock for next-function in express
 *
 * @type {object}
 * @constant
 */
const sinon = require('sinon')

let errorHandler
let error, mockReq, mockRes, mockNext
let mockSend, mockJson

/**.
 * Run tests for errorhandler
 *
 * @type {object}
 * @memberof module:backend/tests/errorHandler_Test
 * @param {string} description - errorhandler tests
 * @param {Function} tests - Function that runs tests
 */
describe('errorhandler tests', () => {

  /**.
   * Restore errorHandler and mocks before each test
   *
   * @memberof module:backend/tests/errorHandler_Test
   * @inner
   * @param {Function} functionBeforeEach - Function to be executed before each test
   */
  beforeEach(() => {
    errorHandler = require('../utils/middleware').errorHandler
    mockReq = mocks.createRequest()
    mockSend = sinon.spy()
    mockJson = sinon.spy()
    mockRes = mocks.createRequest({
      status: () => {
        return {
          send: mockSend,
          json: mockJson
        }
      }
    })
    mockNext = sinon.spy()
  })

  /**.
   * Tests that middleware calls next when no errors
   *
   * @memberof module:backend/tests/errorHandler_Test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('errorHandler calls next when no error', async () => {
    error = {}
    errorHandler(error, mockReq, mockRes, mockNext)
    expect(mockNext.called).toBe(true)
  })

  /**.
   * Tests that middleware responds with CastError
   *
   * @memberof module:backend/tests/errorHandler_Test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('errorHandler sends error when CastError is made', async () => {
    error = {
      name: 'CastError'
    }
    errorHandler(error, mockReq, mockRes, mockNext)
    expect(mockSend.called).toBe(true)
    expect(mockSend.calledWith({ error: 'Id in URL is not correct' })).toBe(true)
  })

  /**.
   * Tests that middleware responds with ValidationError
   *
   * @memberof module:backend/tests/errorHandler_Test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('errorHandler sends error when ValidationError is made', async () => {
    error = {
      name: 'ValidationError',
      message: 'Error with validation!'
    }
    errorHandler(error, mockReq, mockRes, mockNext)
    expect(mockJson.called).toBe(true)
    expect(mockJson.calledWith({ error: 'Error with validation!' })).toBe(true)
  })
})