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
const improvementController = require('../controllers/improvementController')

// handle errors if database-queries fail
require('express-async-errors')

router.get('/weeklyvalues', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const weeklyvalues = await improvementController.findWeeklyValues(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate, req.query.variable)
  res.json(weeklyvalues)
})

router.get('/weeklyimprovement', async (req, res) => {
  const weeklyImprovement = await improvementController.findWeeklyImprovement(req.query.organisation, req.query.withCaregiver,
    req.query.startDate, req.query.endDate, req.query.variable)
  res.json(weeklyImprovement)
})

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
  const users = await controller.findAllUsers(req.query.organisation, withCaregiver)
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
  const caregivers = await controller.findAllAccessCodes(req.query.organisation)
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
  const organisations = await controller.findAllOrgs(req.query.organisation)
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
  const cumulativeUsers = await userhistoryController.findCumulativeNewUsers(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
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
  const activeUsers = await userhistoryController.findActiveUsers(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
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
  const newUsers = await userhistoryController.findNewUsers(req.query.organisation, withCaregiver)
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
  const activity = await userhistoryController.findUserActivitiesToday(req.query.organisation, withCaregiver)
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
  const retention = await retentionrateController.findRetentionRates(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
  res.json(retention)
})

/**
 * Route request for average retention rate
 *
 * @name get_avgretention
 * @function
 * @memberof module:routes/routes
 * @inner
 * @param {string} path - Path for request
 * @param {object} middleware - Handle request to path
 */

router.get('/avgretention', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const avg = await retentionrateController.findAverageRetentionRate(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
  res.json(avg)
})

module.exports = router