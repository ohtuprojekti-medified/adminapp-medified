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
 * Controller for database
 *
 * @type {object}
 * @constant
 * @namespace controller
 */
const controller = require('../controllers/controller')

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
  const users = await controller.findAllUsers()
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
  const caregivers = await controller.findAllAccessCodes()
  res.json(caregivers)
})

router.get('/ping', async (req, res) => {
  res.sendStatus(200)
})

module.exports = router