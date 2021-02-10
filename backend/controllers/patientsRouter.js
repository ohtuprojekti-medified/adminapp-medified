const patientsRouter = require('express').Router()

// DB for testing
let patients = [
  {
    id: 1,
    name: 'Matti M.',
    moods: [
      { id: 1, title: 'suru', range: 5 },
      { id: 2, title: 'ilo', range: 8 },
      { id: 3, title: 'viha', range: 3 },
      { id: 4, title: 'uupumus', range: 1 }
    ]
  },
  {
    id: 2,
    name: 'Maija S.',
    moods: [
      { id: 1, title: 'ilo', range: 5 },
      { id: 2, title: 'ilo', range: 9 },
      { id: 3, title: 'viha', range: 2 },
      { id: 4, title: 'ilo', range: 1 }
    ]
  },
  {
    id: 3,
    name: 'Pekka P.',
    moods: [
      { id: 1, title: 'suru', range: 1 },
      { id: 2, title: 'suru', range: 2 },
      { id: 3, title: 'viha', range: 3 },
      { id: 4, title: 'uupumus', range: 4 }
    ]
  }
]

// HTTP-requests
patientsRouter.get('/', (req, res) => res.json(patients))

module.exports = patientsRouter