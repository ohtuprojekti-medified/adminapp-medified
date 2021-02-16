const router = require('express').Router()
const userController = require('../controllers/user')

// HTTP queries

router.get('/users', async (req, res) => {
  const patients = await userController.findAll()
  res.json(patients)
})

router.post('/users', async (req, res) => {
  const user = {
    name: req.body.name
  }
  await userController.create(user)
  res.status(201).end()

})

module.exports = router