const db = require('../models')
const Patient = db.patients

const create = (req, res) => {
  if(!req.body.name) {
    res.status(400).send({
      message:
        'Patient name can not be empty'
    })
    return
  }

  const patient = {
    name: req.body.title
  }

  Patient.create(patient)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      })
    })
  }

const findAll = (req, res) => {
  Patient.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      })
    })
}

module.exports = { create, findAll }