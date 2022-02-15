const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Add an username']
    },
    email: {
        type: String,
        required: [true, 'Add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Add a password']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)