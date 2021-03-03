/**
 * Tests for authenticateToken middleware
 *
 * @module authenticateToken_test
 * @requires node-mocks-http
 * @requires sinon
 * @requires utils/middleware
 */

/**
 * Mocks for request and response in express
 *
 * @type {object}
 * @constant
 * @namespace mocks
 */
const mocks = require('node-mocks-http')
/**
 * Mock for next-function in express
 *
 * @type {object}
 * @constant
 * @namespace sinon
 */
const sinon = require('sinon')
let authenticateToken
let mockReq, mockRes, mockNext

/**
 * Restore authenticateToken and mocks before each test
 *
 * @name beforeEach
 * @function
 * @memberof module:authenticateToken_test
 * @inner
 * @param {object} functionBeforeEach - Function to be executed before each test
 */
beforeEach(() => {
  authenticateToken = require('../utils/middleware').authenticateToken
  mockRes = mocks.createResponse()
  mockNext = sinon.spy()
})

/**
 * Tests that middleware doesn't allow access without token
 *
 * @name authenticateToken_without_token
 * @function
 * @memberof module:authenticateToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('authenticateToken does not call next when no token', async () => {
  mockReq = mocks.createRequest()
  authenticateToken(mockReq, mockRes, mockNext)
  expect(mockNext.called).toBe(false)
})

/**
 * Tests that middleware doesn't allow access without token
 *
 * @name authenticateToken_without_token
 * @function
 * @memberof module:authenticateToken_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
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