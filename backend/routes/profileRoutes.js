const express = require('express')
const { check, validationResult } = require('express-validator')
const { getProfiles, getProfile, updateProfile, deleteProfile, registerProfile } = require('../controllers/profileController')
const { validateProfile } = require('../helper/profileHelper')
const profileH = require('../helper/profileHelper')
const { authenticateUser, authAdminUser } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(authenticateUser, authAdminUser, getProfiles)
router.route('/').post( validateProfile(), registerProfile)
router.route('/:id').get(authenticateUser, getProfile).delete(authenticateUser, deleteProfile).put(authenticateUser, updateProfile)

module.exports = router



