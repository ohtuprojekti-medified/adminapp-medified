const controller = require('../controllers/controller')

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

describe('user_profiles', () => {
  it('can be found from database', async () => {
    const users = await controller.findAllUsers()
    expect(users.length).toEqual(1)
    expect(users[0].first_name).toEqual('Mikko')
  })
})

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

describe('organisations', () => {
  it('can be found from database', async () => {
    const orgs = await controller.findAllOrgs()
    expect(orgs.length).toEqual(1)
    expect(orgs[0].id).toEqual('OHTU')
  })
})

jest.mock('../models/access_codes', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('access_codes', {
    id: '45h743ffd',
    user_id: '1a2b3c'
  })
})

describe('access_codes', () => {
  it('can be found from database', async () => {
    const codes = await controller.findAllAccessCodes()
    expect(codes.length).toEqual(1)
    expect(codes[0].id).toEqual('45h743ffd')
  })
})

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

describe('care_givers', () => {
  it('can be found from database', async () => {
    const caregivers = await controller.findAllUserCaregivers()
    expect(caregivers.length).toEqual(1)
    expect(caregivers[0].id).toEqual(16)
    expect(caregivers[0].consent).toBe(true)
  })
})

jest.mock('../models/user_activities', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_activities', {
    id: 87,
    user_id: 'fdd8sklla'
  })
})

describe('user_activities', () => {
  it('can be found from database', async () => {
    const activities = await controller.findAllUserActivities()
    expect(activities.length).toEqual(1)
    expect(activities[0].id).toEqual(87)
    expect(activities[0].user_id).toEqual('fdd8sklla')
  })
})

jest.mock('../models/user_answers', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_answers', {
    id: 1,
    user_id: 'fd45677sa',
  })
})

describe('user_answers', () => {
  it('can be found from database', async () => {
    const answers = await controller.findAllUserAnswers()
    expect(answers.length).toEqual(1)
    expect(answers[0].id).toEqual(1)
    expect(answers[0].user_id).toEqual('fd45677sa')
  })
})

jest.mock('../models/user_care_giver_activities', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_care_giver_activities', {
    id: 765,
    user_care_giver_id: 86,
  })
})

describe('user_care_giver_activities', () => {
  it('can be found from database', async () => {
    const caregiverActivities = await controller.findAllUserCaregiverActivities()
    expect(caregiverActivities.length).toEqual(1)
    expect(caregiverActivities[0].id).toEqual(765)
    expect(caregiverActivities[0].user_care_giver_id).toEqual(86)
  })
})

jest.mock('../models/user_diary_item_groups', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user_diary_item_groups', {
    id: 11,
    user_id: 'f84k2ls',
    extra: 'extra'
  })
})

describe('user_diary_item_groups', () => {
  it('can be found from database', async () => {
    const diaryItemGroups = await controller.findAllUserDiaryItemGroups()
    expect(diaryItemGroups.length).toEqual(1)
    expect(diaryItemGroups[0].id).toEqual(11)
    expect(diaryItemGroups[0].user_id).toEqual('f84k2ls')
  })
})

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

describe('user_diary_items', () => {
  it('can be found from database', async () => {
    const diaryItems = await controller.findAllUserDiaryItems()
    expect(diaryItems.length).toEqual(1)
    expect(diaryItems[0].id).toEqual(106)
    expect(diaryItems[0].user_id).toEqual('c1b2a3')
    expect(diaryItems[0].positive).toBe(true)
  })
})

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

describe('user_professional_profiles', () => {
  it('can be found from database', async () => {
    const professionalProfiles = await controller.findAllUserProfessionalProfiles()
    expect(professionalProfiles.length).toEqual(1)
    expect(professionalProfiles[0].id).toEqual('123abcd')
    expect(professionalProfiles[0].name).toEqual('Maija')
    expect(professionalProfiles[0].workplace).toEqual('OHTU')
  })
})

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

describe('user_survey_answers', () => {
  it('can be found from database', async () => {
    const surveyAnswers = await controller.findAllUserSurveyAnswers()
    expect(surveyAnswers.length).toEqual(1)
    expect(surveyAnswers[0].name).toEqual('1a2y')
  })
})