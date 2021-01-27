const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const patientsUrl = '/api/patients'

test('patients are returned in json', async () => {
  await api.get(patientsUrl)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => mongoose.connection.close())