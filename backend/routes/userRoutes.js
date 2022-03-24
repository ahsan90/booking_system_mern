const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController')



router.route('/').get(getUsers)
router.route('/').post([
    check('username').notEmpty().withMessage('Username cannot be empty'),
    check('password', 'Please enter a password of at least 5 characters long').isLength({ min: 6 }),
    check('email').notEmpty().withMessage('Email address required').isEmail().withMessage('Please enter a valid email address')
],createUser)
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser)


module.exports = router