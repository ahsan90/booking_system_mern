const expressAsyncHandler = require('express-async-handler')
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

//Predefined roles and users
const ADMIN = 'Admin'
const CLIENT = 'Client'

const ADMIN_USERNAME = 'ahsan90'
const ADMIN_EMAIL = 'ahrony90@gmail.com'
const ADMIN_PASSWORD = 'adminpass'

const CLIENT_USERNAME = 'steve123'
const CLIENT_EMAIL = 'steve123@mail.com'
const CLIENT_PASSWORD = 'clientpass'
//const DEFAULT_GRAVATAR_IMG = 'https://secure.gravatar.com/avatar/a0070841b8bf8cf069378215b4ba00b7?s=256&r=g'
const DEFAULT_GRAVATAR_IMG = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=256&r=g'
const DUMMY_COMMON_USERNAME = 'fakeuser'
const DUMMY_COMMON_PASSWORD = 'fakepass'


const defaultRolesAndUsers = expressAsyncHandler(async () => {

    let AdminUser = new User({ username: ADMIN_USERNAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    let ClienUser = new User({ username: CLIENT_USERNAME, email: CLIENT_EMAIL, password: CLIENT_PASSWORD })
    let defaultClientProfile = new Profile({ name: 'Steve Mathew', email: ClienUser.email, phone: '9999999999' })
    let defaultAdminProfile = new Profile({ name: 'Ahsan Rony', email: AdminUser.email, phone: '9029082017' })
    let adminRole = await Role.findOne({ roletype: ADMIN })
    if (!adminRole) { adminRole = await Role.create({ roletype: ADMIN }) }

    let clientRole = await Role.findOne({ roletype: CLIENT })
    if (!clientRole) { clientRole = await Role.create({ roletype: CLIENT }) }

    //let user = await User.findOne({ $or: [{ email }, {username}] })

    let xAdminUser = await User.findOne({ $or: [{ email: AdminUser.email }, { username: AdminUser.username }] })
    if (!xAdminUser) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(AdminUser.password, salt)
        let Ahsan_Admin_user = await User.create({ role: adminRole, username: AdminUser.username, email: AdminUser.email, password: hashedPassword, avatar: get_avatar(AdminUser.email) })
        await Profile.create({ user: Ahsan_Admin_user, name: defaultAdminProfile.name, email: defaultAdminProfile.email, phone: defaultAdminProfile.phone })
    }
    let xClientUser = await User.findOne({ $or: [{ email: ClienUser.email }, { username: ClienUser.username }] })
    if (!xClientUser) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(ClienUser.password, salt)
        let Steve_ClientUser = await User.create({ role: clientRole, username: ClienUser.username, email: ClienUser.email, password: hashedPassword, avatar: get_avatar(ClienUser.email) })
        await Profile.create({ user: Steve_ClientUser, name: defaultClientProfile.name, email: defaultClientProfile.email, phone: defaultClientProfile.phone })
    }
})

const get_avatar = (email) => {
    return gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: DEFAULT_GRAVATAR_IMG
    })
}

module.exports = {
    defaultRolesAndUsers, ADMIN, CLIENT, ADMIN_EMAIL, ADMIN_USERNAME, CLIENT_EMAIL, CLIENT_USERNAME, DEFAULT_GRAVATAR_IMG, DUMMY_COMMON_USERNAME, DUMMY_COMMON_PASSWORD, get_avatar
}