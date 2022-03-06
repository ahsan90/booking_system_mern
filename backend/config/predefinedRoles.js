const expressAsyncHandler = require('express-async-handler')
const Role = require('../models/roleModel')


const ADMIN = 'Admin'
const CLIENT = 'Client'
const GUEST = 'Guest'

const existingRoles = expressAsyncHandler( async() => {
    
    const adminUser = await Role.findOne({ roletype: ADMIN })
    if (!adminUser) { await Role.create({ roletype: ADMIN }) }
    
    const clientUser = await Role.findOne({ roletype: CLIENT })
    if (!clientUser) { await Role.create({ roletype: CLIENT }) }
    
    const guestUser = await Role.findOne({ roletype: GUEST })
    if (!guestUser) { await Role.create({ roletype: GUEST })}
})


module.exports = {
    existingRoles, ADMIN, CLIENT, GUEST 
}