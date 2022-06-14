const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const { validateprofile } = require('../helper/profileHelper')
const { profileValidationAtUserCreation } = require('../helper/validationHelper')
const defaultRolesAndUsers = require('../config/defaultRolesAndUsers')
const Profile = require('../models/profileModel')
const { isCurrentAuthUser } = require('../middleware/authMiddleware')
const Reservation = require('../models/reservationModel')



const getAllUsers = asyncHandler(async (req, res) => {
    let users = await User.find().select('-password')
    let usersDetails = {
        user: users
    }
    res.status(200).json(users)
})

const getAllRoles = asyncHandler(async (req, res) => {
    try {
        let roles = await Role.find()
        return res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({ error })
    }

})

const getUser = asyncHandler(async (req, res) => {

    let user = await User.findById(req.params.id).select('-password')
    const profile = await Profile.findOne({ user }).select('-select')
    let role = await Role.findById(req.user.role._id)
    const isCurrentAuthoriziedUser = role.roletype === defaultRolesAndUsers.ADMIN || req.user._id.toString() === user._id.toString()
    if (!isCurrentAuthoriziedUser) { return res.status(403).json({ error: 'Forbidded!' }) }
    //throw new Error('Stop')
    //if (!isCurrentAuthUser(req.user, role.roletype, profile)) return res.status(401).json({ error: 'Unauthorized!' })
    if (!user) {
        res.status(404).json({ error: 'User not found' })
    }

    const singleUserDetails = {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updated: user.updatedAt,
        role: await Role.findById(user.role._id),
        profile: profile ? profile : null,
    }
    res.status(200).json(singleUserDetails)
})
const createUser = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { role, username, email, password, name, phone } = req.body

    try {
        let user = await User.findOne({ $or: [{ email }, { username }] })
        let userRole = await Role.findOne({ roletype: role })

        let profile = null
        if (userRole.roletype === defaultRolesAndUsers.CLIENT) {
            //const { name, phone } = req.body

            const errors = profileValidationAtUserCreation(name, phone)
            if (errors.length > 0) {
                //console.log('Any error?')
                return res.status(400).json({ errors })
            }

            profile = new Profile({ name, email, phone })
        }

        if (user && email === user.email) {
            return res.status(400).json({ error: 'Email already exists' })
        }
        if (user && username === user.username) {
            return res.status(400).json({ error: 'Username already exists' })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({
            role: userRole, username, email, password: hashedPassword, avatar
        })
        let createdUser = await User.create(user)
        //console.log(role+" vs "+defaultRolesAndUsers.profile)
        if (role === defaultRolesAndUsers.CLIENT) { await Profile.create({ user: createdUser, name, email, phone }) }

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email
            })
        } else {
            res.status(400).json({ error: 'Invalid user data' })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error!')
    }
})

const updateUser = asyncHandler(async (req, res) => {

    if ((await User.find({ email: req.body.email })).filter(x => x.id !== req.params.id).length > 0) {
        return res.status(400).json({ error: 'Email is already used by someone else' })
    }
    if ((await User.find({ username: req.body.username })).filter(x => x.id !== req.params.id).length > 0) {
        return res.status(400).json({ error: 'Username is already used by someone else' })
    }

    const profile = await Profile.findOne({ user: await User.findById(req.params.id) })

    let currentUserRole = await Role.findById(req.user.role._id)
    if (!isCurrentAuthUser(req.user, currentUserRole.roletype, profile)) return res.status(403).json({ message: 'Forbidden!' })
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400).json({ error: 'No user found' })
    }

    const { role } = req.body
    let userRole = await Role.findOne({ roletype: role })
    if (!userRole) {
        let { role } = await User.findById(req.params.id)
        userRole = await Role.findOne({ _id: role })
    }

    let userData = { role: userRole, username: req.body.username, email: req.body.email, name: req.body.name, phone: req.body.phone }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, userData, { new: true })
    const xProfile = await Profile.findOne({ user: updatedUser })
    if (xProfile) {
        let profileData = { email: updatedUser.email, name: req.body.name, phone: req.body.phone }
        //console.log(profileData)
        await Profile.findByIdAndUpdate(xProfile._id.toString(), profileData, { new: true })
    }
    res.status(200).json(updatedUser)
})

const createUserProfile = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.id)
    let xProfile = await Profile.findOne({ user })

    //const profile = await Profile.findOne({ user })
    let role = await Role.findById(req.user.role._id)

    const isCurrentAuthoriziedUser = role.roletype === defaultRolesAndUsers.ADMIN || req.user._id.toString() === user._id.toString()

    if (!isCurrentAuthoriziedUser) return res.status(403).json({ error: 'Forbidded!' })
    //throw new Error('Stop')
    if (xProfile) { return res.status(400).json({ error: 'Profile already exist' }) }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let profileData = new Profile({
        user: user, email: user.email, name: req.body.name, phone: req.body.phone
    })

    await Profile.create(profileData)

    let bookings = await Reservation.find({ user })
    const singleUserDetails = {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updated: user.updatedAt,
        role: await Role.findById(user.role._id),
        profile: await Profile.findOne({ user }).select('-user'),
        bookings: bookings.length > 0 ? bookings : null,
    }
    res.status(200).json(singleUserDetails)
})

const deleteUser = asyncHandler(async (req, res) => {

    const profile = await Profile.findOne({ user: req.user })
    let userRole = await Role.findById(req.user.role._id)

    if (!isCurrentAuthUser(req.user, userRole.roletype, profile)) return res.status(401).json({ error: 'Unauthorized!' })
    let user = await User.findByIdAndDelete(req.params.id)

    // Delete if the user has a profile
    let profileToBeDeleted = await Profile.findOne({ user: user })
    if (profileToBeDeleted) {
        await Profile.findByIdAndDelete(profileToBeDeleted._id.toString())
    }
    //await Reservation.deleteMany({user: user})
    res.status(200).json({ id: user._id })
})



module.exports = {
    getAllUsers,
    getUser,
    createUser,
    createUserProfile,
    updateUser,
    deleteUser,
    getAllRoles
}