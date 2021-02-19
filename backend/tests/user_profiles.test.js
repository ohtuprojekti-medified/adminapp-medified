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