/**.
 * Index file for running backend
 *
 * @namespace Backend_index
 * @requires backend/app
 * @requires http
 * @requires backend/utils/config
 * @requires backend/utils/logger
 */

/**.
 * Backend app
 *
 * @type {object}
 * @constant
 * @memberof Backend_index
 */
const app = require('./app')
const http = require('http')

/**.
 * Config for retrieving environment values
 *
 * @type {object}
 * @constant
 * @memberof Backend_index
 */
const config = require('./utils/config')

/**.
 * Logger for logging messages
 *
 * @type {object}
 * @constant
 * @memberof Backend_index
 */
const logger = require('./utils/logger')

/**.
 * Create backend with http
 *
 * @type {object}
 * @constant
 * @memberof Backend_index
 */
const server = http.createServer(app)

/**.
 * Listen to requests made to backend
 *
 * @memberof Backend_index
 * @param {string} PORT - Port that backend listens to
 * @param {Function} functionWhenServerStarts - Function that logs a message when server starts
 */
server.listen(config.PORT, () => logger.log(`Backend is running in port ${config.PORT}`))
