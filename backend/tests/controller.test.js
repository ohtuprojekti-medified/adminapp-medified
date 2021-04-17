/**
 * Tests for controller
 *
 * @constant
 * @module tests/controller_test
 * @requires controllers/controller
 * @requires sequelize-mock
 */

const controller = require('../controllers/controller')

/**
 * Creating mock data for user_profiles
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_profiles_model - user_profiles_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_profiles', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_profiles', {
    user_id: '1a2b3c',
    height: '',
    weight: '',
    sex: null,
    birth_date: null,
    first_name: 'Mikko',
    last_name: 'Mallikas',
    added_organisation: 'OHTU'
  })
})

/**
 * Run tests for user_profiles
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_profiles
 * @param {object} tests - Function that runs tests
 */
describe('user_profiles', () => {
  /**
   * Tests that user_profiles can be found from database
   *
   * @name user_profiles_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const users = await controller.findAllUsers('ALL')
    expect(users.length).toEqual(1)
    expect(users[0].first_name).toEqual('Mikko')
  })

  /**
   * Tests that user_profiles are returned correctly by organisation
   *
   * @name user_profiles_are_returned_correctly_by_organisation
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('are returned correctly by organisation', async () => {
    const users = await controller.findAllUsers('OHTU')
    expect(users.length).toEqual(1)
  })

  /**
   * Tests that user_profiles are returned correctly with organisation and cargiver filtering
   *
   * @name user_profiles_are_returned_correctly_with_organisation_and_cargiver_filtering
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('are returned correctly with organisation and cargiver filtering', async () => {
    const users = await controller.findAllUsers('OHTU', true)
    expect(users.length).toEqual(1)
  })
})

/**
 * Creating mock data for organisations
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} organisations_model - organisations_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/organisations', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('organisations', {
    id: 'OHTU',
    primary_color: '',
    primary_bg_color: '',
    secondary_color: '',
    secondary_bg_color: '',
    action_color: '',
    logo: ''
  })
})

/**
 * Run tests for organisations
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - organisations
 * @param {object} tests - Function that runs tests
 */
describe('organisations', () => {
  /**
   * Tests that organisations can be found from database
   *
   * @name organisations_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const orgs = await controller.findAllOrgs('ALL')
    expect(orgs.length).toEqual(1)
    expect(orgs[0].id).toEqual('OHTU')
  })

  /**
   * Tests that organisations are not returned if request is sent without admin access
   *
   * @name organisations_are_not_returned_if_request_is_sent_without_admin_access
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('are not returned if request is sent without admin access', async () => {
    const orgs = await controller.findAllOrgs('OLEMATON')
    expect(orgs).toBe(null)
  })
})

/**
 * Creating mock data for access_codes
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} access_codes_model - access_codes_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/access_codes', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('access_codes', {
    id: '45h743ffd',
    user_id: '1a2b3c',
    organisation_id: 'OHTU'
  })
})

/**
 * Run tests for access_codes
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - access_codes
 * @param {object} tests - Function that runs tests
 */
describe('access_codes', () => {
  /**
   * Tests that access_codes are all returned if organisation is ALL
   *
   * @name access_codes_are_all_returned_if_organisation_is_ALL
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('are all returned if organisation is ALL', async () => {
    const accessCodes = await controller.findAllAccessCodes('ALL')
    expect(accessCodes.length).toEqual(1)
    expect(accessCodes[0].id).toEqual('45h743ffd')
  })

  /**
   * Tests that access_codes are returned correctly with defined organisation
   *
   * @name access_codes_are_returned_correctly_with_defined_organisation
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('are returned correctly with defined organisation', async () => {
    const accessCodes = await controller.findAllAccessCodes('OHTU')
    expect(accessCodes.length).toEqual(1)
    expect(accessCodes[0].organisation_id).toEqual('OHTU')
  })
})

/**
 * Creating mock data for user_care_givers
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_care_givers_model - user_care_givers_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_care_givers', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_care_givers', {
    id: 16,
    user_id: 'fdd8sklla',
    access_code_id: 'hfd465m45',
    consent: true
  })
})

/**
 * Run tests for care_givers
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - care_givers
 * @param {object} tests - Function that runs tests
 */
describe('care_givers', () => {
  /**
   * Tests that care_givers can be found from database
   *
   * @name care_givers_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const caregivers = await controller.findAllUserCaregivers()
    expect(caregivers.length).toEqual(1)
    expect(caregivers[0].id).toEqual(16)
    expect(caregivers[0].consent).toBe(true)
  })
})

/**
 * Creating mock data for user_activities
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_activities_model - user_activities_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_activities', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_activities', {
    id: 87,
    user_id: 'fdd8sklla'
  })
})

/**
 * Run tests for user_activities
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_activities
 * @param {object} tests - Function that runs tests
 */
describe('user_activities', () => {
  /**
   * Tests that user_activities can be found from database
   *
   * @name user_activities_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const activities = await controller.findAllUserActivities()
    expect(activities.length).toEqual(1)
    expect(activities[0].id).toEqual(87)
    expect(activities[0].user_id).toEqual('fdd8sklla')
  })
})

/**
 * Creating mock data for user_answers
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_answers_model - user_answers_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_answers', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_answers', {
    id: 1,
    user_id: 'fd45677sa',
  })
})

/**
 * Run tests for user_answers
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_answers
 * @param {object} tests - Function that runs tests
 */
describe('user_answers', () => {
  /**
   * Tests that user_answers can be found from database
   *
   * @name user_answers_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const answers = await controller.findAllUserAnswers()
    expect(answers.length).toEqual(1)
    expect(answers[0].id).toEqual(1)
    expect(answers[0].user_id).toEqual('fd45677sa')
  })
})

/**
 * Creating mock data for user_care_giver_activities
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_care_giver_activities_model - user_care_giver_activities_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_care_giver_activities', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_care_giver_activities', {
    id: 765,
    user_care_giver_id: 86,
  })
})

/**
 * Run tests for user_care_giver_activities
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_care_giver_activities
 * @param {object} tests - Function that runs tests
 */
describe('user_care_giver_activities', () => {
  /**
   * Tests that user_care_giver_activities can be found from database
   *
   * @name user_care_giver_activities_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const caregiverActivities = await controller.findAllUserCaregiverActivities()
    expect(caregiverActivities.length).toEqual(1)
    expect(caregiverActivities[0].id).toEqual(765)
    expect(caregiverActivities[0].user_care_giver_id).toEqual(86)
  })
})

/**
 * Creating mock data for user_diary_item_groups
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_diary_item_groups_model - user_diary_item_groups_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_diary_item_groups', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_diary_item_groups', {
    id: 11,
    user_id: 'f84k2ls',
    extra: 'extra'
  })
})

/**
 * Run tests for user_diary_item_groups
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_diary_item_groups
 * @param {object} tests - Function that runs tests
 */
describe('user_diary_item_groups', () => {
  /**
   * Tests that user_diary_item_groups can be found from database
   *
   * @name user_diary_item_groups_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const diaryItemGroups = await controller.findAllUserDiaryItemGroups()
    expect(diaryItemGroups.length).toEqual(1)
    expect(diaryItemGroups[0].id).toEqual(11)
    expect(diaryItemGroups[0].user_id).toEqual('f84k2ls')
  })
})

/**
 * Creating mock data for user_diary_items
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_diary_items_model - user_diary_items_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_diary_items', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_diary_items', {
    id: 106,
    user_id: 'c1b2a3',
    diary_item: 3,
    positive: true,
    extra: 'extra',
    icon: '',
    name: 'item',
    user_diary_item_group_id: 11
  })
})

/**
 * Run tests for user_diary_items
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_diary_items
 * @param {object} tests - Function that runs tests
 */
describe('user_diary_items', () => {
  /**
   * Tests that user_diary_items can be found from database
   *
   * @name user_diary_items_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const diaryItems = await controller.findAllUserDiaryItems()
    expect(diaryItems.length).toEqual(1)
    expect(diaryItems[0].id).toEqual(106)
    expect(diaryItems[0].user_id).toEqual('c1b2a3')
    expect(diaryItems[0].positive).toBe(true)
  })
})

/**
 * Creating mock data for user_professional_profiles
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_professional_profiles_model - user_professional_profiles_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_professional_profiles', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_professional_profiles', {
    id: '123abcd',
    name: 'Maija',
    profession: 'Coder',
    workplace: 'OHTU',
    user_id: 'ajh56dd'
  })
})

/**
 * Run tests for user_professional_profiles
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_professional_profiles
 * @param {object} tests - Function that runs tests
 */
describe('user_professional_profiles', () => {
  /**
   * Tests that user_professional_profiles can be found from database
   *
   * @name user_professional_profiles_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const professionalProfiles = await controller.findAllUserProfessionalProfiles()
    expect(professionalProfiles.length).toEqual(1)
    expect(professionalProfiles[0].id).toEqual('123abcd')
    expect(professionalProfiles[0].name).toEqual('Maija')
    expect(professionalProfiles[0].workplace).toEqual('OHTU')
  })
})

/**
 * Creating mock data for user_survey_answers
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} user_survey_answers_model - user_survey_answers_model
 * @param {object} mock_function - Function that creates mock data
 */
jest.mock('../models/user_survey_answers', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_survey_answers', {
    id: 4,
    name: '1a2y',
    survey_id: '123xyz',
    score: '4',
    options: []
  })
})

/**
 * Run tests for user_survey_answers
 *
 * @type {object}
 * @function
 * @memberof module:tests/controller_test
 * @param {string} description - user_survey_answers
 * @param {object} tests - Function that runs tests
 */
describe('user_survey_answers', () => {
  /**
   * Tests that user_survey_answers can be found from database
   *
   * @name user_survey_answers_can_be_found_from_database
   * @function
   * @memberof module:tests/controller_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  it('can be found from database', async () => {
    const surveyAnswers = await controller.findAllUserSurveyAnswers()
    expect(surveyAnswers.length).toEqual(1)
    expect(surveyAnswers[0].name).toEqual('1a2y')
  })
})