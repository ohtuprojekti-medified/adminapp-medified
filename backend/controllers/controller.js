const db = require('../models')
const models = db.sequelize.models

const findAllOrgs = async () => {
  const allOrganisations = await models.organisations.findAll()
  return allOrganisations
}

const findAllAccessCodes = async () => {
  const accessCodes = await models.access_codes.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return accessCodes
}

const findAllUsers = async () => {
  const userProfiles = await models.user_profiles.findAll({
    attributes: ['user_id', 'created_at', 'first_name', 'last_name', 'updated_at', 'added_organisation']
  })
  return userProfiles
}

const findAllUserCaregivers = async () => {
  const userCaregivers = await models.user_care_givers.findAll({
    attributes: ['id', 'user_id', 'access_code_id', 'consent', 'created_at', 'updated_at']
  })
  return userCaregivers
}

const findAllUserActivities = async () => {
  const userActivities = await models.user_activities.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return userActivities
}

const findAllUserCaregiverActivities = async () => {
  const userCaregiverActivities = await models.user_care_giver_activities.findAll({
    attributes: ['id', 'user_care_giver_id', 'created_at', 'updated_at']
  })
  return userCaregiverActivities
}

const findAllUserAnswers = async () => {
  const userAnswers = await models.user_answers.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return userAnswers
}

const findAllUserDiaryItems = async () => {
  const userDiaryItems = await models.user_diary_items.findAll({
    attributes: ['id', 'user_id', 'diary_item_id', 'positive', 'extra', 'created_at', 'updated_at', 'name', 'user_diary_item_group_id']
  })
  return userDiaryItems
}

const findAllUserDiaryItemGroups = async () => {
  const userDiaryItemGroups = await models.user_diary_item_groups.findAll({
    attributes: ['id', 'user_id', 'extra']
  })
  return userDiaryItemGroups
}

const findAllUserProfessionalProfiles = async () => {
  const userProfessionalProfiles = await models.user_professional_profiles.findAll({
    attributes: ['professional_id', 'user_id', 'name', 'profession', 'workplace', 'created_at', 'updated_at']
  })
  return userProfessionalProfiles
}

const findAllUserSurveyAnswers = async () => {
  const userSurveyAnswers = await models.user_survey_answers.findAll({
    attributes: ['id', 'user_id', 'survey_id', 'score', 'options', 'created_at', 'updated_at']
  })
  return userSurveyAnswers
}
module.exports = {
  findAllOrgs,
  findAllAccessCodes,
  findAllUsers,
  findAllUserCaregivers,
  findAllUserActivities,
  findAllUserCaregiverActivities,
  findAllUserAnswers,
  findAllUserDiaryItems,
  findAllUserDiaryItemGroups,
  findAllUserProfessionalProfiles,
  findAllUserSurveyAnswers
}