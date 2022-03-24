const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'user'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
        ref: 'client'
    },
    reservation_date: {
        type: Date,
        required: true
    },
    booking_reference: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('reservation', reservationSchema)