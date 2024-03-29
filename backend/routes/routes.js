/**.
 * Express router for all paths
 *
 * @module backend/routes/routes
 * @requires express
 * @requires backend/controllers/controller
 * @requires backend/controllers/userhistoryController
 * @requires backend/controllers/retentionrateController
 * @requires express-async-errors
 */

/**.
 * Router for all paths
 *
 * @type {object}
 * @constant
 * @memberof module:backend/routes/routes
 */
const router = require('express').Router()

/**.
 * Controllers for database
 *
 * @type {object}
 * @constant
 * @memberof module:backend/routes/routes
 */
const controller = require('../controllers/controller')
const retentionrateController = require('../controllers/retentionrateController')
const userhistoryController = require('../controllers/userhistoryController')
const improvementController = require('../controllers/improvementController')

// handle errors if database-queries fail
require('express-async-errors')

/**.
 * Route request for users
 *
 * @name get_users
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/users', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const users = await controller.findAllUsers(req.query.organisation, withCaregiver)
  res.json(users)
})

/**.
 * Route request for caregivers
 *
 * @name get_caregivers
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/caregivers', async (req, res) => {
  const caregivers = await controller.findAllAccessCodes(req.query.organisation)
  res.json(caregivers)
})

/**.
 * Route request for organisations
 *
 * @name get_organisations
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/organisations', async (req, res) => {
  const organisations = await controller.findAllOrgs(req.query.organisation)
  res.json(organisations)
})

/**.
 * Route request for secure ping
 *
 * @name get_ping
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/ping', async (req, res) => {
  res.status(200).json({ message: 'token ok' })
})

/**.
 * Route request for cumulative amount of users
 *
 * @name get_cumulative
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */

router.get('/cumulative', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const cumulativeUsers = await userhistoryController.findCumulativeNewUsers(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
  res.json(cumulativeUsers)
})

/**.
 * Route request for amount of active users
 *
 * @name get_activeusers
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */

router.get('/activeusers', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const activeUsers = await userhistoryController.findActiveUsers(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
  res.json(activeUsers)
})

/**.
 * Route request for new users within week
 *
 * @name get_newusers
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */

router.get('/newusers', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const newUsers = await userhistoryController.findNewUsers(req.query.organisation, withCaregiver)
  res.json(newUsers)
})

/**.
 * Route request for user activity today
 *
 * @name get_activitytoday
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */

router.get('/activitytoday', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const activity = await userhistoryController.findUserActivitiesToday(req.query.organisation, withCaregiver)
  res.json(activity)
})

/**.
 * Route request for retention/using periods
 *
 * @name get_retention
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */

router.get('/retention', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const retention = await retentionrateController.findRetentionRates(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
  res.json(retention)
})

/**.
 * Route request for average retention rate
 *
 * @name get_avgretention
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */

router.get('/avgretention', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const avg = await retentionrateController.findAverageRetentionRate(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate)
  res.json(avg)
})

/**.
 * Route request for weekly improvement values
 *
 * @name get_weeklyvalues
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/weeklyvalues', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const byUsingPeriod = req.query.byUsingPeriod === 'true'
  const weeklyvalues = await improvementController.findWeeklyValues(req.query.organisation, withCaregiver, req.query.startDate, req.query.endDate, req.query.variable, byUsingPeriod)
  res.json(weeklyvalues)
})

/**.
 * Route request for weekly mood improvement
 *
 * @name get_weeklyimprovement
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/weeklyimprovement', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const byUsingPeriod = req.query.byUsingPeriod === 'true'
  const weeklyImprovement = await improvementController.findWeeklyImprovement(req.query.organisation, withCaregiver,
    req.query.startDate, req.query.endDate, req.query.variable, byUsingPeriod)
  res.json(weeklyImprovement)
})

/**.
 * Route request for total mood improvement
 *
 * @name get_totalimprovement
 * @memberof module:backend/routes/routes
 * @param {string} path - Path for request
 * @param {Function} middleware - Handle request to path
 */
router.get('/totalimprovement', async (req, res) => {
  const withCaregiver = req.query.withcaregiver === 'true'
  const byUsingPeriod = req.query.byUsingPeriod === 'true'
  const totalImprovement = await improvementController.findTotalImprovement(req.query.organisation, withCaregiver,
    req.query.startDate, req.query.endDate, req.query.variable, byUsingPeriod)
  res.json(totalImprovement)
})

module.exports = router

