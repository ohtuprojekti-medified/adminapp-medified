const router = require('express').Router()
const controller = require('../controllers/controller')

// router.get('/organisations', async (req, res) => {
//   const organisations = await controller.findAllOrgs()
//   res.json(organisations)
// })

// router.get('/codes', async (req, res) => {
//   const codes = await controller.findAllCodes()
//   res.json(codes)
// })

router.get('/users', async (req, res) => {
  const users = await controller.findAllUsers()
  res.json(users)
})

module.exports = router