const sinon = require('sinon')
let app
let middlewares

/**
 * Creates backend without AWS authentication
 *
 * @returns {object} - App without authentication
 */
const appWithMockAuth = () => {
  middlewares = require('./middleware')
  sinon.stub(middlewares, 'authenticateToken')
    .callsFake((req, res, next) => {
      return next()
    })
  app = require('../app')
  return app
}

/**
 * Restores authentication in app if disabled
 */
const restoreAuth = () => {
  middlewares.authenticateToken.restore()
}

module.exports = {
  appWithMockAuth,
  restoreAuth
}