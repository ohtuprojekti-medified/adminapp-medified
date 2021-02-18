const router = require('express').Router()
const controller = require('../controllers/controller')

router.get('/users', async (req, res) => {
  const users = await controller.findAllUsers()
  res.json(users)
})

router.get('/caregivers', async (req, res) => {
  const caregivers = await controller.findAllUserCaregivers()
  res.json(caregivers)
})

module.exports = router