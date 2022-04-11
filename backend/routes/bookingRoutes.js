const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getBooking, getAllBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController')
const { authenticateUser, hasUser,authAdminUser, authBookingUserRole } = require('../middleware/authMiddleware')
const { validateBookingDate } = require('../helper/validationHelper')



router.route('/').get(authenticateUser, authAdminUser, getAllBooking)
router.route('/').post(authenticateUser, validateBookingDate(), createBooking)
router.route('/:id').get(authenticateUser, hasUser, getBooking).delete(authenticateUser, hasUser, deleteBooking)
router.route('/:id').put(authenticateUser, hasUser, updateBooking)

module.exports = router