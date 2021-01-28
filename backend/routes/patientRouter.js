const router = require('express').Router()
const patientController = require('../controllers/patient')
const moodController = require('../controllers/mood')

// HTTP-kyselyt

router.get('/patients', async (req, res) => {
  const patients = await patientController.findAll()
  res.json(patients)
})

router.post('/patients', async (req, res) => {
  const patient = {
    name: req.body.name
  }
  await patientController.create(patient)
  res.status(201).end()

})

router.get('/moods', async (req, res) => {
  const moods = await moodController.findAll()
  res.json(moods)
})

router.post('/moods', async (req, res) => {
  const mood = {
    id: req.body.id,
    title: req.body.title,
    range: req.body.range
  }
  await moodController.create(mood, req.body.patientId)
  res.status(201).end()
})

module.exports = router