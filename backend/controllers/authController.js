const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = asyncHandler(async (req, res) => {
    const {username_or_email, password} = req.body
    let user = await User.findOne({
        $or: [
            { username: username_or_email }, { email: username_or_email }
    ] })
    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            role: user.role,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Login Credentials!')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '100d'
    })
}

module.exports = {
    loginUser
}