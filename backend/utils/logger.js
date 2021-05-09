/**.
 * Module for logging
 *
 * @module backend/utils/logger
 * @exports log
 * @exports logError
 */

/**.
 * Prints messages
 *
 * @memberof module:backend/utils/logger
 * @function
 * @constant
 * @param {...any} messages - Messages to be printed
 */
const log = (...messages) => {
  console.log(...messages)
}

/**.
 * Prints errors
 *
 * @memberof module:backend/utils/logger
 * @function
 * @constant
 * @param {...any} errors - Errors to be printed
 */
const logError = (...errors) => {
  console.log(...errors)
}

module.exports = {
  log,
  logError
}