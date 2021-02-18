const middleware = require('./utils/middleware')
const router = require('./routes/routes')
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Needed if frontend is builded into /public
//app.use(express.static('build'))

// JSON to readable form
app.use(express.json())

// Morgan-logs for HTTP-requests
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny'))
app.use(morgan(':body'))

app.use(cors())

const db = require('./models')
// use alter: true if you need to change database models without losing test/dummy data
// db.sequelize.sync({ alter: true })


db.sequelize.sync()

// Database url
const usersUrl = '/api'
app.use(usersUrl, router)

// Return 404 for undefined paths
app.use(middleware.unknownEndpoint)

// Error handling
app.use(middleware.errorHandler)

module.exports = app