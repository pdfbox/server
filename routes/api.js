const router = require('express').Router()
const User = require('../controllers/user')
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')

router.post('/register', User.register)

router.post('/login', User.login)

router.get('/users', User.list) // buat dev, sebelum deploy hapus dulu

module.exports = router