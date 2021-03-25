const sinon = require('sinon')
let retentionrateController
let db
let user_activities_stub, user_profiles_stub

const retentionrateControllerMocked = () => {
  db = require('../models')
  const TIME6 = new Date(new Date() - 604800000)
  const TIME5 = new Date(new Date() - 1512000010)
  const TIME4 = new Date(new Date() - 2177280020)
  const TIME3 = new Date(new Date() - 2782080030)
  const TIME2 = new Date(new Date() - 3386880040)
  const TIME1 = new Date(new Date() - 3991680050)

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
        },
        {
          dataValues: {
            id: 24,
            user_id: 'user21',
            created_at: TIME4
          }
        },
        {
          dataValues: {
            id: 25,
            user_id: 'user21',
            created_at: TIME5
          }
        },
        {
          dataValues: {
            id: 26,
            user_id: 'user21',
            created_at: TIME6
          }
        },
        {
          dataValues: {
            id: 27,
            user_id: 'user22',
            created_at: TIME4
          }
        },
        {
          dataValues: {
            id: 28,
            user_id: 'user22',
            created_at: TIME5
          }
        },
        {
          dataValues: {
            id: 29,
            user_id: 'user22',
            created_at: TIME6
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
      },
      {
        dataValues: {
          user_id: 'user22',
          height: '',
          weight: '',
          sex: null,
          birth_date: null,
          first_name: 'Maija',
          last_name: 'Ajiam',
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

  test('findRetentionRates returns correct data', async () => {
    expect(await retentionrateController.findRetentionRates()).toEqual([{ daysUsed: 28 }, { daysUsed: 7 }])
  })

  test('findAverageRetentionRate returns correct average', async () => {
    expect(await retentionrateController.findAverageRetentionRate()).toEqual(17.5)
  })

  afterEach(() => {
    user_activities_stub.restore()
    user_profiles_stub.restore()
  })
})