const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
        ref: 'role'
    },
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
    avatar: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)