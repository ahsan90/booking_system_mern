const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    roletype: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('role', roleSchema)