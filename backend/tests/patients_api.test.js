const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const usersUrl = '/api/users'

test('patients are returned in json', async () => {
  await api.get(usersUrl)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => mongoose.connection.close())