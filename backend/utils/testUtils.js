/**
 * Utils for testing
 *
 * @module utils/testUtils
 * @requires sinon
 * @requires utils/middlewares
 * @requires app
 */

const sinon = require('sinon')
let app
let middlewares

/**
 * Creates backend without AWS authentication
 *
 * @name appWithMockAuth
 * @memberof module:utils/testUtils
 * @inner
 * @function
 * @constant
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
 *
 * @name restoreAuth
 * @memberof module:utils/testUtils
 * @inner
 * @function
 * @constant
 */
const restoreAuth = () => {
  middlewares.authenticateToken.restore()
}

module.exports = {
  appWithMockAuth,
  restoreAuth
}