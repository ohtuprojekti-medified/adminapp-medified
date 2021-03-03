/**
 * Index file for running backend
 *
 * @module index
 * @requires app
 * @requires http
 * @requires utils/config
 * @requires utils/logger
 */

/**
 * Backend app
 *
 * @type {object}
 * @constant
 * @namespace app
 */
const app = require('./app')
const http = require('http')

/**
 * Config for retrieving environment values
 *
 * @type {object}
 * @constant
 * @namespace config
 */
const config = require('./utils/config')

/**
 * Logger for logging messages
 *
 * @type {object}
 * @constant
 * @namespace logger
 */
const logger = require('./utils/logger')

/**
 * Create backend with http
 *
 * @type {object}
 * @constant
 * @namespace server
 */
const server = http.createServer(app)

/**
 * Listen to requests made to backend
 *
 * @name server_listen
 * @function
 * @memberof module:index
 * @inner
 * @param {string} PORT - Port that backend listens to
 * @param {object} functionWhenServerStarts - Function that logs a message when server starts
 */
server.listen(config.PORT, () => logger.log(`Backend is running in port ${config.PORT}`))
