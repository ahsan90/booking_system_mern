const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const defaultRolesAndUsers = require('../config/defaultRolesAndUsers')
const { use } = require('../routes/userRoutes')

const authenticateUser = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            //console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: "Unauthorized...!" })
            //throw new Error('Unauthorized access');
        }
    }
    if (!token) {
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

const hasUser = asyncHandler(async (req, res, next) => {
    if (!req.user) { return res.status(403).json({ message: 'Invalid reqeust!' }) }
    next()
}) 

const authAdminUser = asyncHandler(async (req, res, next) => {
    //console.log(req.user)
    if(!req.user) return res.status(401).json({message: 'Unauthorized!'})
    if ((await Role.findById(req.user.role._id)).roletype !== defaultRolesAndUsers.ADMIN) {
        return res.status(401).json({ message: 'Unathorized!' })
    }
    next()
})

const isCurrentAuthUser = (user, roletype, obj) => {
    //console.log(roletype === defaultRolesAndUsers.ADMIN)
    //console.log(obj.user._id.toString() === user._id.toString())
    return roletype === defaultRolesAndUsers.ADMIN || obj.user._id.toString() === user._id.toString() 
}

const protectBuiltInUsers = asyncHandler(async (req, res, next) => {
    if(!req.user) return res.status(401).json({message: 'Unauthorized'})
    const builtInAdminUser = await User.findOne({ $or: [{ email: defaultRolesAndUsers.ADMIN_EMAIL }, {username: defaultRolesAndUsers.ADMIN_USERNAME}] })
    const builtInClientUser = await User.findOne({ $or: [{ email: defaultRolesAndUsers.CLIENT_EMAIL }, { username: defaultRolesAndUsers.CLIENT_USERNAME }] })
    if (builtInAdminUser._id.toString() === req.user._id.toString() || builtInClientUser._id.toString() === req.user._id.toString()) {
        return res.status(403).json({message: 'Built-in admin/client user cannot be deleted'})
    }
    next()
})

module.exports = {
    authenticateUser,
    hasUser,
    authBookingUserRole,
    authAdminUser,
    isCurrentAuthUser,
    protectBuiltInUsers
}