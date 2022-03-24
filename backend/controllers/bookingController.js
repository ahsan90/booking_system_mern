
const asyncHandler = require("express-async-handler");
const Reservation = require('../models/reservationModel')
const moment = require('moment')
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Client = require('../models/clientModel');
const predefinedRoles = require('../config/predefinedRoles')


const getBooking = asyncHandler(async (req, res) => {
    let reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
        return res.status(404).json({message: 'Booking not found'})
    }
    res.status(200).json({reservation})
})

const getAllBooking = asyncHandler(async (req, res) => {
    let reservations = await Reservation.find()
    //console.log((await Role.findOne(req.user.role)).roletype)
    res.status(200).json({reservations})
})


//Reference: https://stackoverflow.com/questions/26827584/mongoose-cast-to-date-failed-for-value-when-updating-a-document
const createBooking = asyncHandler(async (req, res) => {

    let date = new Date()

    let user = await User.findOne(req.user)
    const userRole = await Role.findById(user.role._id)
    let client = null;


    //throw new Error('Stop!')
    if (userRole.roletype == predefinedRoles.ADMIN) {
        const { email } = req.body
        if (!email) {
            throw new Error('Please provide a client\'s registered email address')
        }

        client = await Client.findOne({ email })
        if (!client) {
            return res.status(404).json({message: 'No client found with this email'})
        }
        user = await User.findById(client.user._id)
    }

    if (userRole.roletype == predefinedRoles.CLIENT) {
        client = await Client.findOne({ user: user._id })
    }

    let booking_reference = user.username + "" + moment(date).format('DMYYhmmss').toString()
    
    let bookingDate = moment(new Date(req.body.reservation_date)).format('YYYY-MM-DD').toLocaleLowerCase()
    
    //console.log(startingdate>endingdate)
    //let { startdate, enddate } = req.body
    /* let reservation = await Reservation.findOne({
        $and: [
            { startingdate: { $lte: sDate } },
            { endingdate: { $gte: sDate } },
        ]
    }) */
    let reservation = await Reservation.findOne({reservation_date: bookingDate})
    
    if (reservation) {
        res.status(200).json({ message: 'The Date is already booked!' })
    } else {
        await Reservation.create({user, client, reservation_date: bookingDate, booking_reference })
        let bookedDate = await Reservation.findOne({ reservation_date: bookingDate})
        res.status(200).json({message: `Confirmed! Your date is booked on ${moment(bookedDate.reservation_date).format('LLL')}`})
    }
})

const updateBooking = asyncHandler(async (req, res) => {

    res.status(200).json({message: 'Update booking'})
})

const deleteBooking = asyncHandler(async (req, res) => {
    if (!(await Reservation.findById(req.params.id))) {
        return res.status(404).json({message: 'No reservation found'})
    }
    let booking = await Reservation.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `Booking (id: ${ booking._id}) with the ref(ref#) has been cancelled`})
})

module.exports = {
    getBooking, getAllBooking, createBooking, updateBooking, deleteBooking
}