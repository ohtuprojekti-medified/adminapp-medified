const middleware = require('./utils/middleware')
const patientsRouter = require('./controllers/patientsRouter')
const express = require('express')
// Try-catch no longer needed
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Needed if frontend is builded into /public
//app.use(express.static('build'))

// JSON to readable form
app.use(express.json())

app.use(middleware.authenticateToken)

// Morgan-logs for HTTP-requests
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny'))
app.use(morgan(':body'))

app.use(cors())

// DB-URL
const patientsUrl = '/api/patients'
// /api/patients/ routing
app.use(patientsUrl, patientsRouter)
// Return 404 for non-existent paths
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app