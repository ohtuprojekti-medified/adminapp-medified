/**.
 * Module for logging
 *
 * @module utils/logger
 * @exports log
 * @exports logError
 */

/**.
 * Prints messages
 *
 * @name log
 * @memberof module:utils/logger
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
 * @name logError
 * @memberof module:utils/logger
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