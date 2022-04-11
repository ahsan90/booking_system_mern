const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController')
const { authenticateUser, authAdminUser, hasUser, isCurrentAuthUser } = require('../middleware/authMiddleware')
const {} = require('../helper/validationHelper')



router.route('/').get(authenticateUser, authAdminUser, getAllUsers)
router.route('/').post(authenticateUser, authAdminUser, [
    check('role').notEmpty().withMessage('User role is missing or invalid'),
    check('username').notEmpty().withMessage('Username cannot be empty'),
    check('password', 'Please enter a password of at least 5 characters long').isLength({ min: 6 }),
    check('email').notEmpty().withMessage('Email address required').isEmail().withMessage('Please enter a valid email address')
], createUser)
router.route('/:id').get(authenticateUser, hasUser, getUser)
router.route('/:id').put(authenticateUser, hasUser, updateUser)
router.route('/:id').delete(authenticateUser, hasUser, deleteUser)



module.exports = router