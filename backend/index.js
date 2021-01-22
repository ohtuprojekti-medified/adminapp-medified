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
// const baseUrl = '/api'

// // Testitietokanta
// let patients = [
//   {
//     id: 1,
//     name: 'Matti M.',
//     moods: [
//       { id: 1, title: 'suru', range: 5 },
//       { id: 2, title: 'ilo', range: 8 },
//       { id: 3, title: 'viha', range: 3 },
//       { id: 4, title: 'uupumus', range: 1 }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Maija S.',
//     moods: [
//       { id: 1, title: 'ilo', range: 5 },
//       { id: 2, title: 'ilo', range: 9 },
//       { id: 3, title: 'viha', range: 2 },
//       { id: 4, title: 'ilo', range: 1 }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Pekka P.',
//     moods: [
//       { id: 1, title: 'suru', range: 1 },
//       { id: 2, title: 'suru', range: 2 },
//       { id: 3, title: 'viha', range: 3 },
//       { id: 4, title: 'uupumus', range: 4 }
//     ]
//   }
// ]

// // HTTP-kyselyt
// app.get(`${baseUrl}/patients`, (req, res) => res.json(patients))

const db = require('./models')
db.sequelize.sync()

require('./routes/moodRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend is running in port ${PORT}`))

module.exports = app