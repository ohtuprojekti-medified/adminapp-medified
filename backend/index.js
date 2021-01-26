require('dotenv').config
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Tama tarvitaan, jos frontend buildataan backendiin
//app.use(express.static('build'))

// JSON luettavaan muotoon
app.use(express.json())

// Morgan logit HTTP-pyynnöistä
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny'))
app.use(morgan(':body'))

app.use(cors())


// Tietokannan url
const baseUrl = '/api'

let patients = []
let moods = []

// HTTP-kyselyt
const patientsController = require('./controllers/patient')
const moodsController = require('./controllers/mood')


app.get(`${baseUrl}/patients`, async (req, res) => {
  patients = await patientsController.findAll()
  res.json(patients)
})

app.get(`${baseUrl}/moods`, async (req, res) => {
  moods = await moodsController.findAll()
  res.json(moods)
})

app.post(`${baseUrl}/patients`, async (req, res) => {
  const patient = {
    name: req.name
  }
  await patientsController.create(patient)
  res.status(201).end()
})


const db = require('./models')
db.sequelize.sync()


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend is running in port ${PORT}`))

module.exports = app