const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getBooking, getAllBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController')
const {authenticateUser, authBookingUserRole} = require('../middleware/authMiddleware')



router.route('/').get(authenticateUser, getAllBooking)
router.route('/').post(authenticateUser, authBookingUserRole, createBooking)
router.route('/:id').get(getBooking).delete(deleteBooking).put(updateBooking)

module.exports = router