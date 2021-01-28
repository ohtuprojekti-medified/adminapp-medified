const db = require('../models')
const Mood = db.moods

const create = async (moodObject, patientId) => {

  const response = await Mood.create({
    title: moodObject.title,
    range: moodObject.range,
    patientId: patientId
  })

  return response
}

const findAll = async () => {
  const moods = await Mood.findAll()
  return moods
}

module.exports = { create, findAll }