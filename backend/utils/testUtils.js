const sinon = require('sinon')
let app
let middlewares

const appWithMockAuth = () => {
  middlewares = require('./middleware')
  sinon.stub(middlewares, 'authenticateToken')
    .callsFake((req, res, next) => {
      return next()
    })
  app = require('../app')
  return app
}

const restoreAuth = () => {
  middlewares.authenticateToken.restore()
}

module.exports = {
  appWithMockAuth,
  restoreAuth
}