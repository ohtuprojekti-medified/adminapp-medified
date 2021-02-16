const db = require('../models')
const appUser = db.users

const findAll = async () => {
  const users = await appUser.findAll()
  return users
}

const create = async (userObject) => {
  const response = await appUser.create(userObject)

  return response
}

const findOne = async () => {
  const user = await appUser.findOne()
  return user
}



module.exports = { create, findAll, findOne }