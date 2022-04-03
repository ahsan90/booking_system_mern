const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const defaultRolesAndUsers = require('../config/defaultRolesAndUsers')

const authenticateUser = asyncHandler(async (req, res, next) => {
    req.token = null

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            req.token = req.headers.authorization.split(' ')[1]
            //console.log("Let's see: "+token)
            const decoded = jwt.verify(req.token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            //console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: "Unauthorized!" })
            //throw new Error('Unauthorized access');
        }
    }
    if (!req.token) {
        res.status(401).json({message: 'Unauthorized, no token'})
    }
})

const authBookingUserRole = asyncHandler( async(req, res, next) => {
    const userRole = await Role.findById(req.user.role._id)
    const isAllowed = userRole.roletype == defaultRolesAndUsers.ADMIN
                    || userRole.roletype == defaultRolesAndUsers.CLIENT
    if (isAllowed) {
        next()
    } else {
        res.status(401).json({message: 'Unauthorized!'})
    }
})


const authAdminUser = asyncHandler(async (req, res, next) => {
    //console.log(req.user)
    if(!req.user) return res.status(401).json({message: 'Unauthorized!'})
    if ((await Role.findById(req.user.role._id)).roletype !== defaultRolesAndUsers.ADMIN) {
        return res.status(401).json({ message: 'Unathorized!' })
    }
    next()
    //console.log(req.token)
/* 
    const userRole = await Role.findById(req.user.role._id)
    const isAdmin = userRole.roletype == defaultRolesAndUsers.ADMIN
    if (isAdmin) {
        next()
    } else {
        res.status(401).json({message: 'Unauthorized!'})
    } */
})

const isCurrentAuthUser = (user, roletype, obj) => {
    return roletype === defaultRolesAndUsers.ADMIN || obj.user._id.toString() === user._id.toString() 
}

const protectBuiltInUsers = asyncHandler(async (req, res, next) => {
    if(!req.user) return res.status(401).json({message: 'Unauthorized'})
    const builtInAdminUser = await User.findOne({ $or: [{ email: defaultRolesAndUsers.ADMIN_EMAIL }, {username: defaultRolesAndUsers.ADMIN_USERNAME}] })
    const builtInClientUser = await User.findOne({ $or: [{ email: defaultRolesAndUsers.CLIENT_EMAIL }, { username: defaultRolesAndUsers.CLIENT_USERNAME }] })
    /* console.log(req.user._id)
    console.log(builtInClientUser._id.toString() === req.user._id.toString())
    console.log(builtInAdminUser._id.toString() === req.user._id.toString()) */
    if (builtInAdminUser._id.toString() === req.user._id.toString() || builtInClientUser._id.toString() === req.user._id.toString()) {
        return res.status(403).json({message: 'Built-in admin/client user cannot be deleted'})
    }
    next()
})

module.exports = {
    authenticateUser,
    authBookingUserRole,
    authAdminUser,
    isCurrentAuthUser,
    protectBuiltInUsers
}