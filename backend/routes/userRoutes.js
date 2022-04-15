const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getAllUsers, getUser, createUser, updateUser, deleteUser, createUserProfile } = require('../controllers/userController')
const { authenticateUser, authAdminUser, hasUser, protectBuiltInUsersAndProfile } = require('../middleware/authMiddleware')
const {} = require('../helper/validationHelper')
const { validateProfile_name_phone } = require('../helper/profileHelper')



router.route('/').get(authenticateUser, authAdminUser, getAllUsers)
router.route('/').post(authenticateUser, authAdminUser, [
    check('role').notEmpty().withMessage('User role is missing or invalid'),
    check('username').notEmpty().withMessage('Username cannot be empty'),
    check('password', 'Please enter a password of at least 5 characters long').isLength({ min: 6 }),
    check('email').notEmpty().withMessage('Email address required').isEmail().withMessage('Please enter a valid email address')
], createUser)
router.route('/profile/:id').post(authenticateUser, authAdminUser, validateProfile_name_phone(), createUserProfile)
router.route('/:id').get(authenticateUser, hasUser, getUser)
router.route('/:id').put(authenticateUser, protectBuiltInUsersAndProfile, updateUser)
router.route('/:id').delete(authenticateUser, protectBuiltInUsersAndProfile, deleteUser)



module.exports = router