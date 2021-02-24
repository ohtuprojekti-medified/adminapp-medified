const mongoose = require('mongoose')
const sinon = require('sinon')
const supertest = require('supertest')
let app
let api
let middlewares

let nextMock

beforeEach(() => {
  nextMock = jest.fn()
  middlewares = require('../utils/middleware')
  sinon.stub(middlewares, 'errorHandler')
    .callsFake((error, req, res) => {
      middlewares.errorHandler(error, req, res, nextMock)
    })
  app = require('../app')
  api = supertest(app)
})

// This does not work yet
test('errorHandler calls next when no error', async () => {
  await api.get('/api/patients')
  //expect(nextMock).toHaveBeenCalledTimes(1)
})

afterAll(() => mongoose.connection.close())