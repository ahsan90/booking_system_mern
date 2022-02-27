const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')



const getUsers = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get users' })
})

const getUser = asyncHandler( async (req, res)=>{
    res.status(200).json({message: `Get user ${req.params.id}`})
})
const createUser = asyncHandler( async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { role, username, email, password } = req.body
    
    try {
        let user = await User.findOne({ email })
        let userRole = await Role.findOne({role})

        if (user) {
            res.status(400).json({errors: [{message: 'User already exists'}]})
        } 

        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({
            role: userRole, username, email, password: hashedPassword, avatar
        })
        User.create(user)

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email
            })
        } else {
            res.status(400).json({errors: [{message: 'Invalid user data'}]})
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error!')
    }
})

const updateUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Update user ${req.params.id}` })
})

const deleteUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Delete user ${req.params.id}` })
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}