const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const getUsers = asyncHandler(async (req, res) => {
    let users = await User.find()
    //console.log(users)
    res.status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(400).json({ message: 'User not found' })
    }
    res.status(200).json(user)
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

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    const { role } = req.body
    let userRole = await Role.findOne({ roletype: role })
    if (!userRole) {
        let { role } = await User.findById(req.params.id)
        userRole = await Role.findOne({ _id: role })
    }
    
    let userData = {role: userRole, username: req.body.username, email: req.body.email}
    const updatedUser = await User.findByIdAndUpdate(req.params.id, userData, {new: true} )
    res.status(200).json({updatedUser})
})

const deleteUser = asyncHandler(async (req, res) => {
    let user = await User.findOneAndDelete(req.params.id)
    res.status(200).json(user)
    res.status(200).json({ message: `Delete user ${req.params.id}` })
})

const loginUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    let user = await User.findOne({
        $or: [
            { username: username }, { email: email }
    ] })
    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '100d'
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}