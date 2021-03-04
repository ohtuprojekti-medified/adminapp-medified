const router = require('express').Router()
const controller = require('../controllers/controller')

// handle errors if database-queries fail
require('express-async-errors')

router.get('/users', async (req, res) => {
  const users = await controller.findAllUsers()
  res.json(users)
})

router.get('/caregivers', async (req, res) => {
  const caregivers = await controller.findAllAccessCodes()
  res.json(caregivers)
})

/**
 * Route request for cumulative amount of users
 *
 * @name get_cumulative
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */

router.get('/cumulative', async (req, res) => {
  const cumulativeUsers = await controller.findCumulativeNewUsers()
  res.json(cumulativeUsers)
})

/**
 * Route request for new users within week
 *
 * @name get_newusers
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */

router.get('/newusers', async (req, res) => {
  const newUsers = await controller.findNewUsers()
  res.json(newUsers)
})

/**
 * Route request for user activity today
 *
 * @name get_activitytoday
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */

router.get('/activitytoday', async (req, res) => {
  const activity = await controller.findUserActivitiesToday()
  res.json(activity)
})

module.exports = router