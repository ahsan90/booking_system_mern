const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getBooking, getAllBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController')
const { authenticateUser, authBookingUserRole } = require('../middleware/authMiddleware')
const { validateBookingDate } = require('../helper/validationHelper')



router.route('/').get(authenticateUser, getAllBooking)
router.route('/').post(authenticateUser, validateBookingDate(), createBooking)
router.route('/:id').get(authenticateUser, getBooking).delete(authenticateUser, deleteBooking)
router.route('/:id').put(authenticateUser, updateBooking)

module.exports = router