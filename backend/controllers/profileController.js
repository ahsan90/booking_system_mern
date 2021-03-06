const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const { validateClient } = require('../helper/profileHelper')
const ProfileHelper = require('../config/defaultRolesAndUsers')
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const defaultRolesAndUsers = require('../config/defaultRolesAndUsers')
const { isCurrentAuthUser } = require('../middleware/authMiddleware')


const getProfiles = asyncHandler(async (req, res) => {
    let Profiles = await Profile.find()
    //let specificData = Profiles.map(x => { return [{ lastname: x.lastName }, {firstname: x.firstName }] })
    res.status(200).json(Profiles)
})

const getProfile = asyncHandler(async (req, res) => {
    if (!req.user) { return res.status(403).json({ message: 'Unauthorized' }) }
    let profile = await Profile.findById(req.params.id)
    let userRole = await Role.findById(req.user.role._id)
    if (!isCurrentAuthUser(req.user, userRole.roletype, profile)) { return res.status(401).json({ message: 'Unauthorized!' }) }
    res.status(200).json(profile)
})

const registerProfile = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, phone } = req.body

    try {
        let user = await User.findOne({ email })
        let userRole = await Role.findOne({ roletype: ProfileHelper.CLIENT })
        //return

        if (await User.findOne({ username })) {
            return res.status(400).json({ error: 'Username is already exists' })
        }
        if (user) {
            return res.status(400).json({ error: 'User email already exists' })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: defaultRolesAndUsers.DEFAULT_GRAVATAR_IMG
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({
            role: userRole, username, email, password: hashedPassword, avatar
        })
        User.create(user)

        let profileData = await Profile.create({
            user, name, email, phone
        })

        if (profileData) {
            res.status(201).json(profileData)
        } else {
            res.status(400).json({ errors: 'Invalid client data' })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error!')
    }
})

const updateProfile = asyncHandler(async (req, res) => {

    const profile = await Profile.findById(req.params.id)
    let userRole = await Role.findById(req.user.role._id)
    //throw new Error('Stop!')

    if (!isCurrentAuthUser(req.user, userRole.roletype, profile)) { return res.status(401).json({ error: 'Unauthorized!' }) }

    try {
        if (!profile) {
            res.status(400).json({ error: 'profile profile not found' })
        } else {
            let { name, email, phone } = req.body
            const profileData = {
                name, email, phone
            }
            // update user data if profile wants to update email
            if (email) {
                let xProfile = (await Profile.find({ email })).filter(profile => profile.id !== req.params.id)
                let xUser = (await User.find({ email })).filter(user => user.id !== profile.user._id.toString())
                //console.log('xProfile: '+ xProfile +',\nxUser: '+xUser)
                if (xProfile.length > 0 || xUser.length > 0) {
                    return res.status(400).json({ error: 'This email is already used by soneone else!' })
                }
                const user = await User.findById(profile.user._id)
                await User.findByIdAndUpdate(user._id, { email }, { new: true })
            }
            const updatedProfile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true })
            let latestUserInfo = await User.findById(profile.user._id)
            //res.status(200).json({ profile: updatedProfile, user: latestUserInfo })
            res.status(200).json(updatedProfile)
        }
    } catch (error) {
        return res.status(500).json({ message: '500 Internal Server error' })
    }
})

const deleteProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    let userRole = await Role.findById(req.user.role._id)
    if (!isCurrentAuthUser(req.user, userRole.roletype, profile)) { return res.status(401).json({ message: 'Unauthorized!' }) }

    if (!profile) {
        res.status(404)
        throw new Error('profile not found')
    }
    //console.log(profile._id)
    const deletedProfile = await Profile.findByIdAndDelete(profile._id)
    //await User.findByIdAndDelete(profile.user._id)//Also delete associated user 
    res.status(200).json(deletedProfile)
})

const getProfilesBySearchQuery = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query
    //console.log('Anything Coming?: ' + searchQuery)
    try {
        const searchText = new RegExp(searchQuery, "i")
        const profiles = await Profile.find({
            $or: [{
                name: searchText
            }, { email: searchText }, { phone: searchText }]
        })

        return res.status(200).json(profiles)
    } catch (error) {
        return res.status(404).json({ error: 'Something went wrong!' })
    }
})

module.exports = {
    getProfiles,
    getProfile,
    registerProfile,
    updateProfile,
    deleteProfile,
    getProfilesBySearchQuery
}