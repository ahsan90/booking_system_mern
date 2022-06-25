const asyncHandler = require("express-async-handler");
const Reservation = require('../models/reservationModel')
const moment = require('moment')
const { check, validationResult } = require('express-validator')
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel');
const defaultRolesAndUsers = require('../config/defaultRolesAndUsers');
const res = require("express/lib/response");
const { default: mongoose } = require("mongoose");


const getBooking = asyncHandler(async (req, res) => {

    let userRole = await Role.findById(req.user.role._id)
    let reservation = await Reservation.findById(req.params.id)

    if (!isCurrentAuthUser(req.user, userRole.roletype, reservation)) return res.status(401).json({ message: 'Unauthorized!' })

    if (!reservation) {
        return res.status(404).json({ message: 'Booking not found' })
    }
    res.status(200).json(reservation)
})

const getBookedDates = asyncHandler(async (req, res) => {
    let bookedDates = []
    const x = (await Reservation.find()).filter(x => bookedDates.push(x.reservation_date))
    return res.status(200).json(bookedDates)
})

const getAllBooking = asyncHandler(async (req, res) => {
    let user = await User.findOne(req.user)
    let userRole = await Role.findById(req.user.role._id)
    let reservations = null

    if (userRole.roletype == defaultRolesAndUsers.ADMIN) {
        reservations = await Reservation.find()
        return res.status(200).json(reservations)
    }
    reservations = await Reservation.find({ user: user._id })

    res.status(200).json(reservations)
})

// Get all bookings by user
const getAllBookingsByUserId = asyncHandler(async (req, res) => {
    let userRole = await Role.findById(req.user.role._id)
    const isAuthorirzed = (req.user._id.toString() === req.body.userId) || (userRole.roletype === defaultRolesAndUsers.ADMIN)
    if (!isAuthorirzed) {
        return res.status(403).json({ error: 'Access denied' })
    }
    let user = await User.findById(req.body.userId)
    return res.status(200).json(await Reservation.find({ user }))
})

const createBooking = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let date = new Date()

    let user = await User.findOne(req.user)
    const userRole = await Role.findById(user.role._id)
    let profile = null;

    if (userRole.roletype == defaultRolesAndUsers.ADMIN) {
        const { email } = req.body
        if (!email) {
            throw new Error('Please provide a profile\'s registered email address')
        }

        profile = await Profile.findOne({ email })
        if (!profile) {
            return res.status(404).json({ error: 'No profile found with this email' })
        }
        user = await User.findById(profile.user._id)
    }

    if (userRole.roletype == defaultRolesAndUsers.CLIENT) {
        profile = await Profile.findOne({ user: user._id })
    }

    let booking_reference = user.username.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') + "" + moment(date).format('DMYYhmmss').toString()
    let bookingDate = moment(new Date(req.body.reservation_date)).format('YYYY-MM-DDT00:00:00')

    let reservation = await Reservation.findOne({ reservation_date: bookingDate })

    if (reservation) {
        return res.status(400).json({ error: 'The Date is already booked!' })
    } else {
        await Reservation.create({ user, profile, reservation_date: bookingDate, booking_reference })
        let new_booking = await Reservation.findOne({ reservation_date: bookingDate })
        return res.status(200).json(new_booking)
    }
})

const updateBooking = asyncHandler(async (req, res) => {

    let userRole = await Role.findById(req.user.role._id)
    let reservation = await Reservation.findById(req.params.id)
    let bookingDate = moment(new Date(req.body.reservation_date)).format('YYYY-MM-DDT00:00:00')

    if (!isCurrentAuthUser(req.user, userRole.roletype, reservation)) return res.status(401).json({ message: 'Unauthorized!' })

    let reservationData = { reservation_date: bookingDate }
    let existingBookedDate = moment(new Date(reservation.reservation_date)).format('YYYY-MM-DDT00:00:00')

    //console.log(bookingDate === existingBookedDate)
    if (bookingDate === existingBookedDate) {
        return res.status(200).json({ message: 'No change of booking date' })
    }
    // Make sure the booking date is available before booking
    if ((await Reservation.findOne({ reservation_date: bookingDate }))) {
        return res.status(401).json({ message: 'Reservation date is not available' })

    } else {
        await Reservation.findByIdAndUpdate(req.params.id, reservationData, { new: true })
    }

    reservation = await Reservation.findById(req.params.id)
    res.status(200).json({ reservation })
})

const deleteBooking = asyncHandler(async (req, res) => {

    let userRole = await Role.findById(req.user.role._id)
    const reservation = await Reservation.findById(req.params.id)
    if (!isCurrentAuthUser(req.user, userRole.roletype, reservation)) return res.status(401).json({ message: 'Unauthorized!' })

    if (!(await Reservation.findById(req.params.id))) {
        return res.status(404).json({ message: 'No reservation found' })
    }
    let deletedBooking = await Reservation.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedBooking)
})

const getBookingsBySearchQuery = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query
    //console.log('Anything Coming?: ' + searchQuery)
    try {
        const searchText = new RegExp(searchQuery, "i")
        const bookings = await Reservation.find({ booking_reference: searchText })
        return res.status(200).json(bookings)
    } catch (error) {
        return res.status(404).json({ error: 'Something went wrong!' })
    }
})

const getBookingsByUserSearchQuery = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query
    //console.log('Anything Coming?: ' + searchQuery)
    let userRole = await Role.findById(req.user.role._id)
    const isAuthorirzed = (req.user._id.toString() === req.body.userId) || (userRole.roletype === defaultRolesAndUsers.ADMIN)
    if (!isAuthorirzed) {
        return res.status(403).json({ error: 'Access denied' })
    }
    let user = await User.findById(req.body.userId)
   
    try {
        const searchText = new RegExp(searchQuery, "i")
        const bookings = await Reservation.find({
            $and: [{ booking_reference: searchText }, { user }]
        })
        return res.status(200).json(bookings)
    } catch (error) {
        return res.status(404).json({ error: 'Something went wrong!' })
    }
})

const isCurrentAuthUser = (user, roletype, reservation) => {
    return roletype === defaultRolesAndUsers.ADMIN || reservation.user._id.toString() === user._id.toString()
}

module.exports = {
    getBooking, getAllBooking, getAllBookingsByUserId, createBooking, updateBooking, deleteBooking, getBookedDates, getBookingsBySearchQuery, getBookingsByUserSearchQuery
}