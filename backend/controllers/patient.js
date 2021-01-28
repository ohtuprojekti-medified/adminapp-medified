const db = require('../models')
const Patient = db.patients


const create = async (patientObject) => {

  const response = await Patient.create(patientObject)

  return response
}

// const findAll = async () => {
//   const patients = await Patient.findAll()
//   return patients
// }

const findAll = async () => {
  const response = await Patient.findAll({
    include: [
      {
        model: db.moods
      }
    ]
  })

  const patients = response.map(patients => patients.dataValues)
  // console.log(patients)

  const resObj = patients.map(p => {
    return Object.assign(
      {},
      {
        id: p.id,
        name: p.name,
        moods: p.Moods.map(m => {
          return Object.assign(
            {},
            {
              id: m.id,
              title: m.title,
              range: m.range,
              patientId: m.patientId
            }
          )
        })
      }
    )
  })
  return resObj
}

module.exports = { create, findAll }