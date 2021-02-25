const mocks = require('node-mocks-http')
const sinon = require('sinon')
let unknownEndpoint
let mockReq, mockRes, mockNext
let mockSend

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

test('authenticateToken does not call next when no token', async () => {
  unknownEndpoint(mockReq, mockRes, mockNext)
  expect(mockSend.calledWith({ error: 'URL path does not match anything' })).toBe(true)
})