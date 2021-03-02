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

module.exports = router