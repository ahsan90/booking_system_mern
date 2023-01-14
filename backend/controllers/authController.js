const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const Role = require('../models/roleModel')


const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username_or_email, password } = req.body
    let user = await User.findOne({
        $or: [
            { username: username_or_email }, { email: username_or_email }
        ]
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            role: (await Role.findById(user.role.toString())).roletype,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400).json({ error: 'Invlalid Login Credential' })
        //throw new Error('Invalid Login Credentials!')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    })
}

module.exports = {
    loginUser
}