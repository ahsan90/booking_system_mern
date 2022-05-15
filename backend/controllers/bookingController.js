
const asyncHandler = require("express-async-handler");
const Reservation = require('../models/reservationModel')
const moment = require('moment')
const { check, validationResult } = require('express-validator')
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel');
const defaultRolesAndUsers = require('../config/defaultRolesAndUsers');
const res = require("express/lib/response");


const getBooking = asyncHandler(async (req, res) => {

    let userRole = await Role.findById(req.user.role._id)
    let reservation = await Reservation.findById(req.params.id)

    if (!isCurrentAuthUser(req.user, userRole.roletype, reservation)) return res.status(401).json({ message: 'Unauthorized!' })

    if (!reservation) {
        return res.status(404).json({message: 'Booking not found'})
    }
    res.status(200).json({reservation})
})

const getAllBooking = asyncHandler(async (req, res) => {
    let user = await User.findOne(req.user)
    let userRole = await Role.findById(req.user.role._id)
    let reservations = null
    if (userRole.roletype == defaultRolesAndUsers.ADMIN) {
        reservations = await Reservation.find()
        return res.status(200).json({ reservations })
    }
    reservations = await Reservation.find({user: user._id })
    //console.log((await Role.findOne(req.user.role)).roletype)
    res.status(200).json(reservations)
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
            return res.status(404).json({message: 'No profile found with this email'})
        }
        user = await User.findById(profile.user._id)
    }

    if (userRole.roletype == defaultRolesAndUsers.CLIENT) {
        profile = await Profile.findOne({ user: user._id })
    }

    let booking_reference = user.username + "" + moment(date).format('DMYYhmmss').toString()
    let bookingDate = moment(new Date(req.body.reservation_date)).format('YYYY-MM-DDT00:00:00')
    let reservation = await Reservation.findOne({reservation_date: bookingDate})
    
    if (reservation) {
        res.status(200).json({ message: 'The Date is already booked!' })
    } else {
        await Reservation.create({user, profile, reservation_date: bookingDate, booking_reference })
        let bookedDate = await Reservation.findOne({ reservation_date: bookingDate})
        res.status(200).json({message: `Confirmed! Your date is booked on ${moment(bookedDate.reservation_date).format('LLL')}`})
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
        return res.status(200).json({message: 'No change of booking date'})
    }
    // Make sure the booking date is available before booking
    if ((await Reservation.findOne({ reservation_date: bookingDate }))) {
        return res.status(401).json({message: 'Reservation date is not available'})
        
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
        return res.status(404).json({message: 'No reservation found'})
    }
    let booking = await Reservation.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `Booking (Ref #: ${ booking.booking_reference}) has been cancelled`})
})

const isCurrentAuthUser = (user, roletype, reservation) => {
    return roletype === defaultRolesAndUsers.ADMIN || reservation.user._id.toString() === user._id.toString() 
}

module.exports = {
    getBooking, getAllBooking, createBooking, updateBooking, deleteBooking
}