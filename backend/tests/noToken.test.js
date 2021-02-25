const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('patients are not returned without token', async () => {
  await api.get('/api/users')
    .expect(403)
})

afterAll(() => mongoose.connection.close())