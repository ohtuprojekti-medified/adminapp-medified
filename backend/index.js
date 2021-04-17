/**
 * Index file for running backend
 *
 * @namespace Backend_index
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
 * @module app
 * @memberof Backend_index
 */
const app = require('./app')
const http = require('http')

/**
 * Config for retrieving environment values
 *
 * @type {object}
 * @constant
 * @module config
 * @memberof Backend_index
 */
const config = require('./utils/config')

/**
 * Logger for logging messages
 *
 * @type {object}
 * @constant
 * @module logger
 * @memberof Backend_index
 */
const logger = require('./utils/logger')

/**
 * Create backend with http
 *
 * @type {object}
 * @constant
 * @module server
 * @memberof Backend_index
 */
const server = http.createServer(app)

/**
 * Listen to requests made to backend
 *
 * @name server_listen
 * @function
 * @memberof Backend_index
 * @inner
 * @param {string} PORT - Port that backend listens to
 * @param {object} functionWhenServerStarts - Function that logs a message when server starts
 */
server.listen(config.PORT, () => logger.log(`Backend is running in port ${config.PORT}`))
