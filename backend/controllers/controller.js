const db = require('../models')
const organisations = db.sequelize.models.organisations
const access_codes = db.sequelize.models.access_codes
const user_profiles = db.sequelize.models.user_profiles

const findAllOrgs = async () => {
  const allOrganisations = await organisations.findAll()
  return allOrganisations
}

const findAllCodes = async () => {
  const accessCodes = await access_codes.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return accessCodes
}

const findAllUsers = async () => {
  const userProfiles = await user_profiles.findAll({
    attributes: ['user_id', 'created_at', 'updated_at', 'added_organisation']
  })
  return userProfiles
}

module.exports = { findAllOrgs, findAllCodes, findAllUsers }