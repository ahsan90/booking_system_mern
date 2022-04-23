
const express = require('express')
const router = express.Router()
const { loginUser } = require('../controllers/authController')
const {loginFormValidation} = require('../helper/authHelper')

router.route('/login').post(loginFormValidation(), loginUser)

module.exports = router