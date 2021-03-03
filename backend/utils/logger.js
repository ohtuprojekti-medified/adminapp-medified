/**
 * Module for logging
 *
 * @module /utilslogger
 */

/**
 * Prints messages
 *
 * @name log
 * @memberof module:utils/loggers
 * @inner
 * @function
 * @constant
 * @param  {...any} messages - Messages to be printed
 */
const log = (...messages) => {
  console.log(...messages)
}

/**
 * Prints errors
 *
 * @name logError
 * @memberof module:/utilsloggers
 * @inner
 * @function
 * @constant
 * @param  {...any} errors - Errors to be printed
 */
const logError = (...errors) => {
  console.log(...errors)
}

module.exports = {
  log,
  logError
}