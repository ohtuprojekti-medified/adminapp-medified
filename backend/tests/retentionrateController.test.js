const sinon = require('sinon')
let retentionrateController
let db
let user_activities_stub, user_profiles_stub

const retentionrateControllerMocked = () => {
  db = require('../models')
  const TIME3 = new Date(new Date() - 604800000)
  const TIME2 = new Date(new Date() - 1512000000)
  const TIME1 = new Date(new Date() - 2177280000)
  user_activities_stub = sinon.stub(db.user_activities, 'findAll')
    .callsFake(() => {
      return [
        {
          dataValues: {
            id: 21,
            user_id: 'user21',
            created_at: TIME1
          }
        },
        {
          dataValues: {
            id: 22,
            user_id: 'user21',
            created_at: TIME2
          }
        },
        {
          dataValues: {
            id: 23,
            user_id: 'user21',
            created_at: TIME3
          }
        }
      ]
    })
  user_profiles_stub = sinon.stub(db.user_profiles, 'findAll')
    .callsFake(() => {
      return [{
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
      }]
    })
  retentionrateController = require('../controllers/retentionrateController')
  return retentionrateController
}

describe('retentionrate controller', () => {
  beforeEach(() => {
    retentionrateController = retentionrateControllerMocked()
  })

  test('returns correct data', async () => {
    expect(await retentionrateController.findRetentionRates()).toEqual([{ daysUsed: 7 }])
  })

  afterEach(() => {
    user_activities_stub.restore()
    user_profiles_stub.restore()
  })
})