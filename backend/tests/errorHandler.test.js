/**
 * Tests for errorHandler middleware
 *
 * @module errorHandler_Test
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

let errorHandler
let error, mockReq, mockRes, mockNext
let mockSend, mockJson

/**
 * Restore errorHandler and mocks before each test
 *
 * @name beforeEach
 * @function
 * @memberof module:errorHandler_Test
 * @inner
 * @param {object} functionBeforeEach - Function to be executed before each test
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

/**
 * Tests that middleware calls next when no errors
 *
 * @name errorHandler_when_no_error
 * @function
 * @memberof module:errorHandler_Test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('errorHandler calls next when no error', async () => {
  error = {}
  errorHandler(error, mockReq, mockRes, mockNext)
  expect(mockNext.called).toBe(true)
})

/**
 * Tests that middleware responds with CastError
 *
 * @name errorHandler_when_CastError
 * @function
 * @memberof module:errorHandler_Test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
 */
test('errorHandler sends error when CastError is made', async () => {
  error = {
    name: 'CastError'
  }
  errorHandler(error, mockReq, mockRes, mockNext)
  expect(mockSend.called).toBe(true)
  expect(mockSend.calledWith({ error: 'Id in URL is not correct' })).toBe(true)
})

/**
 * Tests that middleware responds with ValidationError
 *
 * @name errorHandler_when_ValidationError
 * @function
 * @memberof module:errorHandler_Test
 * @inner
 * @param {string} name - Name of the test
 * @param {object} test - Test code
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