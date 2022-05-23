const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getAllUsers, getUser, createUser, updateUser, deleteUser, createUserProfile, getAllRoles } = require('../controllers/userController')
const { authenticateUser, authAdminUser, hasUser, protectBuiltInUsersAndProfile } = require('../middleware/authMiddleware')
const {validateUserData} = require('../helper/validationHelper')
const { validateProfile_name_phone } = require('../helper/profileHelper')



router.route('/').get(authenticateUser, authAdminUser, getAllUsers)
router.route('/roles').get(authenticateUser, authAdminUser, getAllRoles)
router.route('/').post(authenticateUser, authAdminUser,validateUserData(), createUser)
router.route('/profile/:id').post(authenticateUser, hasUser, validateProfile_name_phone(), createUserProfile)
router.route('/:id').get(authenticateUser, hasUser, getUser)
router.route('/:id').put(authenticateUser, protectBuiltInUsersAndProfile, updateUser)
router.route('/:id').delete(authenticateUser, protectBuiltInUsersAndProfile, deleteUser)



module.exports = router