const db = require('../models')
const Mood = db.moods

const create = async () => {
  // TO DO
}

const findAll = async () => {
  const moods = await Mood.findAll()
  return moods
}

module.exports = { create, findAll }