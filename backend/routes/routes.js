/**
 * Express router for all paths
 *
 * @module routes/routes
 * @requires express
 * @requires controllers/controller
 * @requires express-async-errors
 */

/**
 * Router for all paths
 *
 * @type {object}
 * @constant
 * @namespace router
 */
const router = require('express').Router()

/**
 * Controllers for database
 *
 * @type {object}
 * @constant
 * @namespace controller
 */
const controller = require('../controllers/controller')
const retentionrateController = require('../controllers/retentionrateController')
const userhistoryController = require('../controllers/userhistoryController')

// handle errors if database-queries fail
require('express-async-errors')

/**
 * Route request for users
 *
 * @name get_users
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */
router.get('/users', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const users = await controller.findAllUsers(req.get('organisation-requested'), withCaregiver)
  res.json(users)
})

/**
 * Route request for caregivers
 *
 * @name get_caregivers
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */
router.get('/caregivers', async (req, res) => {
  const caregivers = await controller.findAllAccessCodes(req.get('organisation-requested'))
  res.json(caregivers)
})

/**
 * Route request for organisations
 *
 * @name get_organisations
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */
 router.get('/organisations', async (req, res) => {
  const organisations = await controller.findAllOrgs(req.get('organisation-requested'))
  res.json(organisations)
})

/**
 * Route request for secure ping
 *
 * @name get_ping
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */
router.get('/ping', async (req, res) => {
  res.status(200).json({ message: 'token ok' })
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
  const withCaregiver = req.query.withcaregiver === 'true'
  const cumulativeUsers = await userhistoryController.findCumulativeNewUsers(req.get('organisation-requested'), withCaregiver)
  res.json(cumulativeUsers)
})

/**
 * Route request for amount of active users
 *
 * @name get_activeusers
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */

router.get('/activeusers', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const activeUsers = await userhistoryController.findActiveUsers(req.get('organisation-requested'), withCaregiver)
  res.json(activeUsers)
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
  const withCaregiver = req.query.withcaregiver === 'true'
  const newUsers = await userhistoryController.findNewUsers(req.get('organisation-requested'), withCaregiver)
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
  const withCaregiver = req.query.withcaregiver === 'true'
  const activity = await userhistoryController.findUserActivitiesToday(req.get('organisation-requested'), withCaregiver)
  res.json(activity)
})

/**
 * Route request for retention/using periods
 *
 * @name get_retention
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */

router.get('/retention', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const retention = await retentionrateController.findRetentionRates(req.get('organisation-requested'), withCaregiver)
  res.json(retention)
})

router.get('/avgretention', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const avg = await retentionrateController.findAverageRetentionRate(req.get('organisation-requested'), withCaregiver)
  res.json(avg)
})

module.exports = router