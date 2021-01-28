const middleware = require('./utils/middleware')
//const patientsRouter = require('./controllers/patientsRouter')
const patientsRouter = require('./routes/patientRouter')
const express = require('express')
// Try-catch ei tarvita patientsRouterissa
require('express-async-errors')
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

const db = require('./models')
db.sequelize.sync()

// Tietokannan url
const patientsUrl = '/api'
// /api/patients/ polkujen käsittely
app.use(patientsUrl, patientsRouter)
// Pyyntoihin ylla maarittelemattomista poluista palautetaan 404
app.use(middleware.unknownEndpoint)
// Virheidenkasittely
app.use(middleware.errorHandler)

module.exports = app