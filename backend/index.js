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
app.get(`${baseUrl}/patients`, (req, res) => res.json(patients))
app.get(`${baseUrl}/moods`, (req, res) => res.json(moods))


const db = require('./models')
db.sequelize.sync()

require('./routes/appRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend is running in port ${PORT}`))

module.exports = app