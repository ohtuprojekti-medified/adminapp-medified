const db = require('../models')
const Mood = db.moods

const create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message:
        'Content can not be empty'
    })
    return
  }

  const mood = {
    title: req.body.title,
    range: req.body.range
  }

  Mood.create(mood)
    .then(data => {
      res.send(data)
    })
    .catxh(err => {
      res.status(500).send({
        message:
          err.message
      })
    })
}

const findAll = (req, res) => {
  Mood.findAll()
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