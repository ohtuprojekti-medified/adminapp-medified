/**
 * Tests for unknownEndpoint middleware
 *
 * @module tests/unknownEndpoint_test
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
let unknownEndpoint
let mockReq, mockRes, mockNext
let mockSend

/**
 * Restore unknownEndpoint and mocks before each test
 *
 * @name beforeEach
 * @function
 * @memberof module:tests/unknownEndpoint_test
 * @inner
 * @param {object} functionBeforeEach - Function to be executed before each test
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

/**
 * Tests that middleware responds with error
 *
 * @name unknownEndpoint
 * @function
 * @memberof module:tests/unknownEndpoint_test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('unknownEndpoint sends error', async () => {
  unknownEndpoint(mockReq, mockRes, mockNext)
  expect(mockSend.calledWith({ error: 'URL path does not match anything' })).toBe(true)
})