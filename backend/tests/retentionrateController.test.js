const { DataTypes } = require('sequelize')
const sinon = require('sinon')
const { sequelize } = require('../models')
let retentionrateController
let user_activities, user_profiles
let user_activities_stub, user_profiles_stub

const retentionrateControllerMocked = () => {
  user_activities = require('../models/user_activities')
  user_activities_stub = sinon.stub(user_activities(sequelize, DataTypes), 'findAll')
    .callsFake(() => {
      return {
        dataValues: {
          id: 21,
          user_id: 'user21'
        }
      }
    })
  user_profiles = require('../models/user_profiles')
  user_profiles_stub = sinon.stub(user_profiles(sequelize, DataTypes), 'findAll')
    .callsFake(() => {
      return {
        dataValues: {
          user_id: 'user21',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Matti',
          last_name: 'Ittam',
          added_organisation: 'OHTU'
        }
      }
    })
  retentionrateController = require('../controllers/retentionrateController')
  return retentionrateController
}

describe('retentionrate controller', () => {
  beforeEach(() => {
    retentionrateController = retentionrateControllerMocked()
  })

  test('returns correct data', async () => {
    expect(retentionrateController.findRetentionRates()).toEqual([{ daysUsed: 1 }])
  })

  afterEach(() => {
    user_activities_stub.restore()
    user_profiles_stub.restore
  })
})