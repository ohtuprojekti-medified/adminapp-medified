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



module.exports = { create, findAll }