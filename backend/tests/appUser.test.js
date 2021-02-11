const userController = require('../controllers/user')

jest.mock('../models/appuser', () => () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  return dbMock.define('user', {
    id: 2,
    name: 'Matti'
  })
})

describe('When database is initialized with one user', () => {
  it('right user\'s name is returned', async () => {
    const user = await userController.findOne()
    expect(user.name).toEqual('Matti')
  })
})