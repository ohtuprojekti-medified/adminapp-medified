const mocks = require('node-mocks-http')
const sinon = require('sinon')
let authenticateToken
let mockReq, mockRes, mockNext

beforeEach(() => {
  authenticateToken = require('../utils/middleware').authenticateToken
  mockRes = mocks.createResponse()
  mockNext = sinon.spy()
})

test('authenticateToken does not call next when no token', async () => {
  mockReq = mocks.createRequest()
  authenticateToken(mockReq, mockRes, mockNext)
  expect(mockNext.called).toBe(false)
})

test('authenticateToken does not call next when token is fake', async () => {
  mockReq = mocks.createRequest({
    headers: {
      Authorization: 'Bearer abc123'
    }
  })
  authenticateToken(mockReq, mockRes, mockNext)
  expect(mockNext.called).toBe(false)
})