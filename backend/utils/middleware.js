/**
 * Middlewares for backend
 *
 * @module utils/middleware
 * @requires utils/logger
 * @requires cognito-express
 */

/**
 * Logger for logging messages and errors
 *
 * @type {object}
 * @constant
 * @namespace logger
 */
const logger = require('./logger')

/**
 * CognitoExpress for validating token given by frontend
 *
 * @type {object}
 * @constant
 * @namespace CognitoExpress
 */
const CognitoExpress = require('cognito-express')

/**
 * Take CognitoExpress in use
 * see: https://www.npmjs.com/package/cognito-express
 */
const cognitoExpress = new CognitoExpress({
  region: 'eu-west-1',
  cognitoUserPoolId: 'eu-west-1_sAj8nsLY6',
  tokenUse: 'id',
  tokenExpiration: 300000
})

/**
 * Authenticating token in aws here
 *
 * @name authenticateToken
 * @memberof module:utils/middlewares
 * @inner
 * @function
 * @constant
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {object} next - Next-function
 */
const authenticateToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  } else {

    const bearer = req.get('authorization')

    if (bearer === undefined || bearer.indexOf('Bearer ') !== 0) {
      res.status(403).send({ error: 'Invalid token!' })
    }
    const idTokenFromClient = bearer !== undefined
      ? bearer.substr('Bearer '.length)
      : ''
    console.log('token=' + idTokenFromClient)

    cognitoExpress.validate(idTokenFromClient, (err) => {
      if (err) {
        res.status(403).send({ error: 'Invalid token!' })

      } else {
        next()
      }
    })
  }
}

/**
 * Sends 404 to unknown paths
 *
 * @name unknownEndpoint
 * @memberof module:utils/middlewares
 * @inner
 * @function
 * @constant
 * @param {object} req - Request
 * @param {object} res - Response
 */
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'URL path does not match anything' })
}

/**
 * Handles errors
 *
 * @name errorHandler
 * @memberof module:utils/middlewares
 * @inner
 * @function
 * @constant
 * @param {object} error -Errors
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {object} next - Next-function
 */
const errorHandler = (error, req, res, next) => {
  logger.logError(error.name, error.message)

  switch (error.name) {
  case 'CastError':
    res.status(400).send({ error: 'Id in URL is not correct' })
    break
  case 'ValidationError':
    res.status(400).json({ error: error.message })
    break
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  authenticateToken
}