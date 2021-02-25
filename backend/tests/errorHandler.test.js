const mocks = require('node-mocks-http')
const sinon = require('sinon')

let errorHandler
let error, mockReq, mockRes, mockNext
let mockSend, mockJson

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

test('errorHandler calls next when no error', async () => {
  error = {}
  errorHandler(error, mockReq, mockRes, mockNext)
  expect(mockNext.called).toBe(true)
})

test('errorHandler sends error when CastError is made', async () => {
  error = {
    name: 'CastError'
  }
  errorHandler(error, mockReq, mockRes, mockNext)
  expect(mockSend.called).toBe(true)
  expect(mockSend.calledWith({ error: 'Id in URL is not correct' }))
})

test('errorHandler sends error when CastError is made', async () => {
  error = {
    name: 'ValidationError',
    message: 'Error with validation!'
  }
  errorHandler(error, mockReq, mockRes, mockNext)
  expect(mockJson.called).toBe(true)
  expect(mockJson.calledWith({ error: 'Error with validation!' }))
})