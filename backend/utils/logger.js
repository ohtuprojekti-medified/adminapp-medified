const log = (...messages) => {
  console.log(...messages)
}

const logError = (...errors) => {
  console.log(...errors)
}

module.exports = {
  log,
  logError
}