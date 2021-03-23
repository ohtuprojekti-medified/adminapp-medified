const sinon = require('sinon')
let retentionrateController
let user_activities, user_profiles

const retentionrateControllerMocked = () => {
  user_activities = require('../models/user_activities')
  let user_activities_stub = sinon.createStubInstance(user_activities)
  user_activities_stub.findAll().returns({
    dataValues: {
      id: 21,
      user_id: 'user21'
    }
  }
  )
  user_profiles = require('../models/user_profiles')
  let user_profiles_stub = sinon.createStubInstance(user_profiles)
  user_profiles_stub.findAll().returns({
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
  )
  retentionrateController = require('../controllers/retentionrateController')
  return retentionrateController
}

describe('retentionrate controller', () => {
  beforeEach(() => {
    retentionrateController = retentionrateControllerMocked()
  })

  test('returns correct data', async () => {
    console.log('test: ', retentionrateController.findRetentionRates())
  })
})