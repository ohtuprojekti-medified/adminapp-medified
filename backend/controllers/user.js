const db = require('../models')
const user_profile = db.sequelize.models.user_profile

const findAll = async () => {
  const users = await user_profile.findAll()
  return users
}

const create = async (userObject) => {
  const response = await user_profile.create(userObject)

  return response
}

const findOne = async () => {
  const user = await user_profile.findOne()
  return user
}



module.exports = { create, findAll, findOne }