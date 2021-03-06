const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const { getBooking, getAllBooking, createBooking, updateBooking, deleteBooking, getAllBookingsByUserId, getBookedDates, getBookingsBySearchQuery, getBookingsByUserSearchQuery } = require('../controllers/bookingController')
const { authenticateUser, hasUser, authAdminUser, authBookingUserRole } = require('../middleware/authMiddleware')
const { validateBookingDate } = require('../helper/validationHelper')



router.route('/').get(authenticateUser, authAdminUser, getAllBooking)
router.route('/search').get(authenticateUser, authAdminUser, getBookingsBySearchQuery)
router.route('/search').post(authenticateUser, getBookingsByUserSearchQuery)
router.route('/byuser').post(authenticateUser, getAllBookingsByUserId)
router.route('/booked').get(authenticateUser, getBookedDates)
router.route('/').post(authenticateUser, validateBookingDate(), createBooking)
router.route('/:id').get(authenticateUser, hasUser, getBooking).delete(authenticateUser, hasUser, deleteBooking)
router.route('/:id').patch(authenticateUser, hasUser, updateBooking)

module.exports = router