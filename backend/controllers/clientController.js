const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const res = require('express/lib/response')
const { validateClient, v, test } = require('../helper/clientHelper')
const clientHelper = require('../config/predefinedRoles') 
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Client = require('../models/clientModel')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')


const getClients = asyncHandler(async (req, res) => {
    let clients = await Client.find()

    //let specificData = clients.map(x => { return [{ lastname: x.lastName }, {firstname: x.firstName }] })
    
    //console.log(user)
    res.status(200).json(clients)
})

const getClient = asyncHandler(async (req, res) => {
    let client = await Client.findById(req.params.id)
    res.status(200).json({client})
})

const registerClient = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName, phone } = req.body
    
    try {
        let user = await User.findOne({ email })
        let userRole = await Role.findOne({ roletype: clientHelper.CLIENT })

        console.log(userRole)
        //return

        if (user) {
            res.status(400).json({ errors: [{ message: 'User email already exists' }] })
            console.log('stop here')
        } 

        if (await User.findOne({ username })) {
            res.status(400).json({errors: [{message: 'Username is already exists'}]})
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

        let clientData = await Client.create({
            user, firstName, lastName, email, phone
        })

        if (clientData) {
            res.status(201).json(clientData)
        }else {
            res.status(400).json({errors: [{message: 'Invalid client data'}]})
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error!')
    }
})

const updateClient = asyncHandler(async (req, res) => {
    res.status(200).json({messsage: `Update client ${req.params.id}`})
})

const deleteClient = asyncHandler(async (req, res) => {
    res.status(200).json({messsage: `Delete client ${req.params.id}`})
})

module.exports={
    getClients,
    getClient,
    registerClient,
    updateClient,
    deleteClient
}