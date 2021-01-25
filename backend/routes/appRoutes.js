module.exports = app => {
  const patients = require('../controllers/patient')
  const moods = require('../controllers/mood')

  var router = require('express').Router()

  router.post('/moods', moods.create)

  router.get('/moods', moods.findAll)

  router.get('/patients', patients.findAll)

  router.post('/patients', patients.create)

  app.use('/api', router)
}