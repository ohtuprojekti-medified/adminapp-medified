const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

const apiUrl = '/api'

test('patients are returned in json', async () => {
  await api.get(apiUrl + '/patients')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => mongoose.connection.close())