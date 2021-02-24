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
  sinon.stub(middlewares, 'authenticateToken')
    .callsFake((req, res) => {
      middlewares.authenticateToken(req, res, nextMock)
    })
  app = require('../app')
  api = supertest(app)
})

test('authenticateToken calls next when no token', async () => {
  await api.get('/api/patients')
  expect(nextMock).toHaveBeenCalledTimes(0)
})

afterAll(() => mongoose.connection.close())