/**.
 * Backend app
 *
 * @module backend/app
 * @requires backend/utils/middleware
 * @requires backend/routes/routes
 * @requires express
 * @requires express-async-errors
 * @requires morgan
 * @requires cors
 * @requires backend/models/index
 * @exports app
 */

/**.
 * Middlewares for backend
 *
 * @type {object}
 * @constant
 * @module middleware
 * @memberof module:backend/app
 */
const middleware = require('./utils/middleware')

/**.
 * Router for requests to backend
 *
 * @type {object}
 * @constant
 * @module router
 * @memberof module:backend/app
 */
const router = require('./routes/routes')

/**.
 * Express for creating backend
 *
 * @type {object}
 * @constant
 * @module express
 * @memberof module:backend/app
 */
const express = require('express')
require('express-async-errors')

/**.
 * Morgan for better logs in backend terminal
 *
 * @type {object}
 * @constant
 * @module morgan
 * @memberof module:backend/app
 */
const morgan = require('morgan')

/**.
 * Cors for allowing cross origin requests
 *
 * @type {object}
 * @constant
 * @module cors
 * @memberof module:backend/app
 */
const cors = require('cors')

/**.
 * App created with express
 *
 * @type {object}
 * @constant
 * @memberof module:backend/app
 */
const app = express()

/**.
 * Middleware for allowing cross origin requests
 *
 * @name cors
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware for cross origin requests
 */
app.use(cors())

// Needed if frontend is builded into /public
//app.use(express.static('build'))

/**.
 * JSON to readable form
 *
 * @name express_json
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware that converts data to JSON
 */
app.use(express.json())

/**.
 * Verify token from frontend
 *
 * @name authenticateToken
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware that verifies token
 */

app.use(middleware.authenticateToken)

// Morgan-logs for HTTP-requests
morgan.token('body', (req) => JSON.stringify(req.body))

/**.
 * Tiny Morgan-logs for HTTP-requests
 *
 * @name tiny_morgan
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware for tiny Morgan logging
 */
app.use(morgan('tiny'))

/**.
 * Morgan-logs for HTTP-requests
 *
 * @name morgan_body
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware for Morgan logging
 */
app.use(morgan(':body'))


/**.
 * Database connection
 *
 * @name models
 * @constant
 * @memberof module:backend/app
 */
const db = require('./models')

// Error-handling for failing database connection
db.sequelize.sync()
  .then(function () {
    console.log('Connected to DB')
  }, function (err) {
    console.log(err.original)
  })



/**.
 * Url for api requests
 *
 * @constant
 * @type {string}
 */
const apiUrl = '/api'

/**.
 * Use router with apiUrl
 *
 * @name router_with_url
 * @function
 * @memberof module:backend/app
 * @param {string} apiUrl - Url for backend
 * @param {object} router - Router for requests to apiUrl
 */
app.use(apiUrl, router)

/**.
 * Return 404 for undefined paths
 *
 * @name unknownEndpoint
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware for handling unknown endpoints
 */
app.use(middleware.unknownEndpoint)

/**.
 * Error handling
 *
 * @name errorHandler
 * @function
 * @memberof module:backend/app
 * @param {object} middleware - Middleware for handling errors
 */
app.use(middleware.errorHandler)

module.exports = app