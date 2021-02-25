const mongoose = require('mongoose')
const supertest = require('supertest')
const testuTILS = require('../utils/testUtils')
let app
let api

const patientsUrl = '/api/patients'

beforeEach(() => {
  app = testuTILS.appWithMockAuth()
  api = supertest(app)
})

test('patients are returned in json', async () => {
  await api.get(patientsUrl)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterEach(() => {
  testuTILS.restoreAuth()
})

afterAll(() => mongoose.connection.close())