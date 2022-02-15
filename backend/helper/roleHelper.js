const role = require('../models/roleModel')

const roleData = [
    {
        roletype: 'Admin'
    },
    {
        roletype: 'Customer'
    }
];

const roleSeedDb = async () => { 

    //const admin_customer_role = role.find({ roletype: 'Admin' && 'Customer' })
    await role.deleteMany()
    await role.insertMany(roleData)
}

module.exports = {roleSeedDb}