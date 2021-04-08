const sinon = require('sinon')
let controller, mockedController, db, user_profiles_stub

const controllerMocked = () => {
  db = require('../models')

  user_profiles_stub = sinon.stub(db.user_profiles, 'findAll')
    .callsFake(() => {
      return [
        {
          dataValues: {
            user_id: '1a2b3c',
            height: null,
            weight: null,
            sex: null,
            birth_date: null,
            first_name: 'Mikko',
            last_name: 'Mallikas',
            added_organisation: 'OHTU'
          }
        }
      ]
    })
  controller = require('../controllers/controller')
  return controller
}

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


describe('users with caregivers', () => {
  beforeEach(() => {
    mockedController = controllerMocked()
  })

  test('are returned correctly', async () => {
    const users = await mockedController.findAllUsers('undefined', true)
    console.log(users)
    expect(users.length).toEqual(1)
  })

  afterEach(() => {
    user_profiles_stub.restore()
  })
})