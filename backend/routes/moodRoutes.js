module.exports = app => {
  const moods = require('../controllers/mood')

  var router = require('express').Router()

  router.post('/', moods.create)

  router.get('/', moods.findAll)

  app.use('/api/moods', router)
}