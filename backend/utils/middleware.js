/**
 * Middlewares for backend
 *
 * @module utils/middlewares
 * @requires utils/logger
 * @requires cognito-express
 * @requires utils/config
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
 * Config for retrieving environment variables in backend
 *
 * @type {object}
 * @constant
 * @namespace config
 */
const config = require('./config')

//instructions used with authenticating token: https://www.npmjs.com/package/cognito-express
const cognitoExpress = new CognitoExpress({
  region: 'eu-west-1',
  cognitoUserPoolId: config.REACT_APP_USER_POOL_ID,
  tokenUse: 'id', //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
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
  //fix cors somehow (2 different domain names, if someone sends options-request just let proceed)
  if (req.method === 'OPTIONS') {
    next()
  } else {

    //get entire content under Authorization header
    const bearer = req.get('authorization')
    console.log(JSON.stringify(req.headers))
    //get the id token
    //if the bearer is undefined, or bearer does not start with 'Bearer ' don't proceed
    if (bearer === undefined || bearer.indexOf('Bearer ') !== 0) {
      res.status(403).send({ error: 'Invalid token!' })
    }
    const idTokenFromClient = bearer !== undefined
      ? bearer.substr('Bearer '.length)
      : ''
    console.log('token=' + idTokenFromClient)

    //id token sent to AWS and asked if it's valid or not
    cognitoExpress.validate(idTokenFromClient, (err) => {
      if (err) {
        res.status(403).send({ error: 'Invalid token!' })
        /*
              //API is not authenticated, do something with the error.
              //Perhaps redirect user back to the login page

              //ERROR TYPES:

              //If accessTokenFromClient is null or undefined
              err = {
                  "name": "TokenNotFound",
                  "message": "access token not found"
              }

              //If tokenuse doesn't match accessTokenFromClient
              {
                  "name": "InvalidTokenUse",
                  "message": "Not an id token"
              }

              //If token expired
              err = {
                  "name": "TokenExpiredError",
                  "message": "jwt expired",
                  "expiredAt": "2017-07-05T16:41:59.000Z"
              }

              //If token's user pool doesn't match the one defined in constructor
              {
                  "name": "InvalidUserPool",
                  "message": "access token is not from the defined user pool"
              }

          */
      } else {
        //Else API has been authenticated. Proceed.
        //res.locals.user = response; //Optional - if you want to capture user information
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