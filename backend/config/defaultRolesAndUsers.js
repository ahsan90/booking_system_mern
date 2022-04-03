const expressAsyncHandler = require('express-async-handler')
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Client = require('../models/clientModel')
const bcrypt = require('bcryptjs')

//Predefined roles and users
const ADMIN = 'Admin'
const CLIENT = 'Client'
const GUEST = 'Guest'

const ADMIN_USERNAME = 'ahsan90'
const ADMIN_EMAIL = 'ahrony90@gmail.com'

const CLIENT_USERNAME = 'steve123'
const CLIENT_EMAIL = 'steve123@mail.com'


const defaultRolesAndUsers = expressAsyncHandler(async () => {
    
    let AdminUser = new User({ username: ADMIN_USERNAME, email: ADMIN_EMAIL, password: 'ahsan90' })
    let ClienUser = new User({ username: CLIENT_USERNAME, email: CLIENT_EMAIL, password: 'steve123' })
    let defaultClient = new Client({ name: 'Steve Mathew', email: ClienUser.email, phone: '9999999999' })  
    
    let adminRole = await Role.findOne({ roletype: ADMIN })
    if (!adminRole) { adminRole = await Role.create({ roletype: ADMIN }) }
    
    let clientRole = await Role.findOne({ roletype: CLIENT })
    if (!clientRole) { clientRole = await Role.create({ roletype: CLIENT }) }
    
    let guestRole = await Role.findOne({ roletype: GUEST })
    if (!guestRole) { guestRole = await Role.create({ roletype: GUEST }) }

    //let user = await User.findOne({ $or: [{ email }, {username}] })

    let xAdminUser = await User.findOne({ $or: [{ email: AdminUser.email }, { username: AdminUser.username }] })
    if (!xAdminUser) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(AdminUser.password, salt)
        await User.create({role: adminRole, username: AdminUser.username, email: AdminUser.email, password: hashedPassword})
    }
    let xClientUser = await User.findOne({ $or: [{ email: ClienUser.email }, { username: ClienUser.username }] })
    if (!xClientUser) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(ClienUser.password, salt)
        let Steve_ClientUser = await User.create({ role: clientRole, username: ClienUser.username, email: ClienUser.email, password: hashedPassword })
        await Client.create({user: Steve_ClientUser, name: defaultClient.name, email: defaultClient.email, phone: defaultClient.phone, password: hashedPassword})
    }
})

module.exports = {
    defaultRolesAndUsers, ADMIN, CLIENT, GUEST, ADMIN_EMAIL, ADMIN_USERNAME, CLIENT_EMAIL, CLIENT_USERNAME
}