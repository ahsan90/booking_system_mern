const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
        ref: 'user'
    },
    name: {
        type: String,
        required: [true, 'Add an name']
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

module.exports = mongoose.model('profile', profileSchema)