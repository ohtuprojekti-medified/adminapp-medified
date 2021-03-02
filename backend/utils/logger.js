/**
 * Prints messages
 *
 * @param  {...any} messages - Messages to be printed
 */
const log = (...messages) => {
  console.log(...messages)
}

/**
 * Prints errors
 *
 * @param  {...any} errors - Errors to be printed
 */
const logError = (...errors) => {
  console.log(...errors)
}

module.exports = {
  log,
  logError
}