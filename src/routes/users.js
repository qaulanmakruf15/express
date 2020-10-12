const router = require('express').Router()
const { register_user, login_user} = require('../controller/users')

router.post("/register", register_user)
router.post("/login", login_user)

module.exports = router
