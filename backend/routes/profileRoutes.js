const express = require('express')
const { check, validationResult } = require('express-validator')
const { getProfiles, getProfile, updateProfile, deleteProfile, registerProfile, getProfilesBySearchQuery } = require('../controllers/profileController')
const { validateProfile } = require('../helper/profileHelper')
const profileH = require('../helper/profileHelper')
const { authenticateUser, authAdminUser,  protectBuiltInUsersAndProfile} = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(authenticateUser, authAdminUser, getProfiles)
router.route('/search').get(authenticateUser, authAdminUser, getProfilesBySearchQuery)
router.route('/').post(validateProfile(), registerProfile)
router.route('/:id').delete(authenticateUser, protectBuiltInUsersAndProfile, deleteProfile)
router.route('/:id').get(authenticateUser, getProfile).put(authenticateUser, protectBuiltInUsersAndProfile, updateProfile)

module.exports = router



