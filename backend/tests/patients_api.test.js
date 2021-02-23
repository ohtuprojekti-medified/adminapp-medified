const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const patientsUrl = '/api/patients'

test('patients are not returned without token', async () => {
  await api.get(patientsUrl)
    .expect(403)
})

afterAll(() => mongoose.connection.close())