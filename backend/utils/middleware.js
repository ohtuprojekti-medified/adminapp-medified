const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'URL path does not match anything' })
}

const errorHandler = (error, req, res, next) => {
  logger.logError(error.name, error.message)

  switch (error.name) {
  case 'CastError':
    res.status(400).send({ error: 'Id in URL is not correct' })
  case 'ValidationError':
    res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}