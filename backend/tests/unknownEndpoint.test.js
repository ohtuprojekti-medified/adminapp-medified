const mongoose = require('mongoose')
const sinon = require('sinon')
const supertest = require('supertest')
let app
let api
let middlewares

let resMock

beforeEach(() => {
  resMock = {
    status: jest.fn()
  }
  middlewares = require('../utils/middleware')
  sinon.stub(middlewares, 'unknownEndpoint')
    .callsFake((req) => {
      middlewares.authenticateToken(req, resMock)
    })
  app = require('../app')
  api = supertest(app)
})

// This does not work yet
test('unknownEndPoint responds with statuscode 404', async () => {
  await api.get('/unknownURL')
  //expect(resMock.status).toHaveBeenCalledWith(404)
})

afterAll(() => mongoose.connection.close())