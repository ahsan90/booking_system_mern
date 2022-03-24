const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const ExistingRoles = require('../config/predefinedRoles')

const authenticateUser = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            //console.log("Let's see: "+token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            //console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: "Unauthorized" })
            //throw new Error('Unauthorized access');
        }
    }
    if (!token) {
        res.status(401).json({message: 'Unauthorized, no token'})
    }
})

const authBookingUserRole = async(req, res, next) => {
    const userRole = await Role.findById(req.user.role._id)
    const isAllowed = userRole.roletype == ExistingRoles.ADMIN
                    || userRole.roletype == ExistingRoles.CLIENT
    if (isAllowed) {
        next()
    } else {
        res.status(401).json({message: 'Unauthorized!'})
    }
}


module.exports = {
    authenticateUser,
    authBookingUserRole
}