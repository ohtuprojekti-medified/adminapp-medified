const db = require('../models')
const Patient = db.patients

const create = async (patientObject) => {

  const response = await Patient.create(patientObject)

  return response
}

const findAll = async () => {
  const patients = await Patient.findAll()
  return patients
}

module.exports = { create, findAll }