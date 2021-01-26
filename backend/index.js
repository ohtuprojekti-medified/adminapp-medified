const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const patientsRouter = require('./controllers/patientsRouter')
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
const patientsUrl = '/api/patients'
// /api/patients/ polkujen käsittely
app.use(patientsUrl, patientsRouter)
// Pyyntoihin ylla maarittelemattomista poluista palautetaan 404
app.use(middleware.unknownEndpoint)

app.listen(config.PORT, () => logger.log(`Backend is running in port ${config.PORT}`))

module.exports = app