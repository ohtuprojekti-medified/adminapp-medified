/**
 * Controller for database queries
 *
 * @module controllers/controller
 * @requires date-fns
 * @requires models/db
 * @requires models/Sequelize
 */

const db = require('../models')
const user_profiles = db.user_profiles
const access_codes = db.access_codes
const organisations = db.organisations
const user_care_givers = db.user_care_givers
const user_survey_answers = db.user_survey_answers
const user_professional_profiles = db.user_professional_profiles
const user_diary_items = db.user_diary_items
const user_diary_item_groups = db.user_diary_item_groups
const user_activities = db.user_activities
const user_answers = db.user_answers
const user_care_giver_activities = db.user_care_giver_activities
const { Sequelize } = require('../models')
const Op = Sequelize.Op

const sequelize = db.sequelize
/**
 * Returns all access codes from database
 *
 * @returns  {...any} accessCodes - list of access codes
 */

const findAllAccessCodes = async (organisation) => {
  console.log(access_codes)
  let accessCodes = undefined
  if(organisation == 'undefined') {
    accessCodes = await access_codes.findAll({
      attributes: ['id', 'user_id', 'organisation_id', 'created_at', 'updated_at']
    })
  } else {
    accessCodes = await access_codes.findAll({
      attributes: ['id', 'user_id', 'organisation_id', 'created_at', 'updated_at'],
      where: {
        organisation_id: organisation
      }
    })
  }
  
  return accessCodes
}

/**
 * Returns all organisations from database for admin
 *
 * @returns  {...any} allOrganisations - list of organisations
 */

const findAllOrgs = async (organisation) => {
  // only admin can send requests with undefined organisation
  if (organisation == 'undefined') {
    const allOrganisations = await organisations.findAll()
    return allOrganisations
  } else {
    return null
  }
}

/**
 * Returns all users from database
 *
 * @returns  {...any} userProfiles - list of users
 */

const findAllUsers = async (organisation, withCaregiver) => {
  let userProfiles
  if(organisation == 'undefined') {
    // admin request from all data
    if (withCaregiver === true) {
      userProfiles = sequelize.query('SELECT DISTINCT user_profiles.user_id, user_profiles.created_at, user_profiles.first_name, user_profiles.last_name, user_profiles.updated_at, user_profiles.added_organisation FROM user_profiles, user_care_givers WHERE user_profiles.user_id = user_care_givers.user_id', { type: sequelize.QueryTypes.SELECT })
    } else {
      userProfiles = await user_profiles.findAll({
        attributes: ['user_id', 'created_at', 'first_name', 'last_name', 'updated_at', 'added_organisation']
      })
    }
  } else {
    // find organisational users based on organisational caregiver-user relationships
    const accessCodesOrganisation = await findAllAccessCodes(organisation)

    const organisationAccessCodesIdArray = accessCodesOrganisation.map(accessCode => accessCode.id)
    const caregiverUserRelationshipsOrganisation = await user_care_givers.findAll({
      where: {
        access_code_id: organisationAccessCodesIdArray
      }
    })
    const userIdsLinkedToOrganisationalCaregivers = caregiverUserRelationshipsOrganisation.map(relationship => relationship.user_id)
    let uniqueIds = [...new Set(userIdsLinkedToOrganisationalCaregivers)];

    if(withCaregiver === true) {
      userProfiles = await user_profiles.findAll({
        attributes: ['user_id', 'created_at', 'first_name', 'last_name', 'updated_at', 'added_organisation'],
        where: {
          user_id: uniqueIds
        }
      })
    } else {
      // includes also users from organisation that don't have a caregiver 
      userProfiles = await user_profiles.findAll({
        attributes: ['user_id', 'created_at', 'first_name', 'last_name', 'updated_at', 'added_organisation'],
        where: {
          [Op.or]: [
            { user_id: uniqueIds },
            { added_organisation: organisation }
          ]
        }
      })
    }
  }

  return userProfiles
}

/**
 * Returns all caregivers from database
 * Note that caregivers-table contains one db-entry for every caregiver-user realtionship
 *
 * @returns  {...any} userCaregivers - list of caregiver-user relationships
 */

const findAllUserCaregivers = async () => {
  const userCaregivers = await user_care_givers.findAll({
    attributes: ['id', 'user_id', 'access_code_id', 'consent', 'created_at', 'updated_at']
  })
  return userCaregivers
}

/**
 * Returns all user ctivities from database
 *
 * @returns  {...any} userActivities - list of all user activities
 */

const findAllUserActivities = async () => {
  const userActivities = await user_activities.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return userActivities
}

/**
 * Returns all caregiver activities from database
 *
 * @returns  {...any} userCaregiverActivities - list of all caregiver activities
 */

const findAllUserCaregiverActivities = async () => {
  const userCaregiverActivities = await user_care_giver_activities.findAll({
    attributes: ['id', 'user_care_giver_id', 'created_at', 'updated_at']
  })
  return userCaregiverActivities
}

/**
 * Returns all user answers from database
 *
 * @returns  {...any} userAnswers - list of user answers
 */

const findAllUserAnswers = async () => {
  const userAnswers = await user_answers.findAll({
    attributes: ['id', 'user_id', 'created_at', 'updated_at']
  })
  return userAnswers
}

/**
 * Returns all diary items from database
 *
 * @returns  {...any} userDiaryItems - list of all user diary items
 */

const findAllUserDiaryItems = async () => {
  const userDiaryItems = await user_diary_items.findAll({
    attributes: ['id', 'user_id', 'diary_item_id', 'positive', 'extra', 'created_at', 'updated_at', 'name', 'user_diary_item_group_id']
  })
  return userDiaryItems
}

/**
 * Returns all diary item groups from database
 *
 * @returns  {...any} userDiaryItemGroups - list of diary item groups
 */

const findAllUserDiaryItemGroups = async () => {
  const userDiaryItemGroups = await user_diary_item_groups.findAll({
    attributes: ['id', 'user_id', 'extra']
  })
  return userDiaryItemGroups
}

/**
 * Returns all professional profiles from database
 *
 * @returns  {...any} userProfessionalProfiles - list of all professional profiles
 */

const findAllUserProfessionalProfiles = async () => {
  const userProfessionalProfiles = await user_professional_profiles.findAll({
    attributes: ['professional_id', 'user_id', 'name', 'profession', 'workplace', 'created_at', 'updated_at']
  })
  return userProfessionalProfiles
}

/**
 * Returns all survey answers from database
 *
 * @returns  {...any} userSurveyAnswers - list of survey answers
 */

const findAllUserSurveyAnswers = async () => {
  const userSurveyAnswers = await user_survey_answers.findAll({
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