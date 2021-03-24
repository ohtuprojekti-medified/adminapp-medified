const sinon = require('sinon')
let retentionrateController
let db
let user_activities_stub, user_profiles_stub

const retentionrateControllerMocked = () => {
  db = require('../models')
  user_activities_stub = sinon.stub(db, 'user_activities')
    .callsFake(() => {
      return {
        findAll: () => {
          return {
            dataValues: {
              id: 21,
              user_id: 'user21'
            }
          }
        }
      }
    })
  user_profiles_stub = sinon.stub(db, 'user_profiles')
    .callsFake(() => {
      return {
        findAll: () => {
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
    user_profiles_stub.restore()
  })
})