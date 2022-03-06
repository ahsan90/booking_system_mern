const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
        ref: 'user'
    },
    firstName: {
        type: String,
        required: [true, 'Add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Add an last name']
    },
    email: {
        type: String,
        required: [true, 'Add an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Add a phone number']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('client', clientSchema)