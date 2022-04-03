const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const { validateClient } = require('../helper/clientHelper')
const clientHelper = require('../config/defaultRolesAndUsers') 
const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Client = require('../models/clientModel')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const {isCurrentAuthUser} = require('../middleware/authMiddleware')


const getClients = asyncHandler(async (req, res) => {
    let clients = await Client.find()
    //let specificData = clients.map(x => { return [{ lastname: x.lastName }, {firstname: x.firstName }] })
    res.status(200).json({ clients: clients })
})

const getClient = asyncHandler(async (req, res) => {
    if(!req.user) { return res.status(403).json({message: 'Unauthorized'})}
    let client = await Client.findById(req.params.id)
    let userRole = await Role.findById(req.user.role._id)
    if (!isCurrentAuthUser(req.user, userRole.roletype, client)) { return res.status(401).json({ message: 'Unauthorized!' }) }        
    res.status(200).json({client})
})

const registerClient = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, phone } = req.body
    
    try {
        let user = await User.findOne({ email })
        let userRole = await Role.findOne({ roletype: clientHelper.CLIENT })
        //return

        if (user) {
            return res.status(400).json({ message: 'User email already exists' })
        } 

        if (await User.findOne({ username })) {
            return res.status(400).json({message: 'Username is already exists'})
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
            user, name, email, phone
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

    const client = await Client.findById(req.params.id)
    let userRole = await Role.findById(req.user.role._id)
    //throw new Error('Stop!')

    if (!isCurrentAuthUser(req.user, userRole.roletype, client)) { return res.status(401).json({ message: 'Unauthorized!' }) }

    if (!client) {
        res.status(400).json({message: 'Client profile not found'})
    } else {
        let {name, email, phone } = req.body
        const clientData = {
            name, email, phone
        }
        // update user data if client wants to update email
        if (email) {
            let xClient = (await Client.find({ email })).filter(obj => obj.id !== req.params.id)
            let xUser = (await User.find({ email })).filter(user => user.id !== client.user._id.toString())
            //console.log('xClient: '+ xClient +',\nxUser: '+xUser)
            if (xClient.length > 0 || xUser.length > 0) {
                return res.status(400).json({message: 'This email is already used by soneone else!'})
            }
            const user = await User.findById(client.user._id)
            await User.findByIdAndUpdate(user._id, {email}, {new: true})
        }
        const updatedClient = await Client.findByIdAndUpdate(client._id, clientData, { new: true })
        let latestUserInfo = await User.findById(client.user._id)
        res.status(200).json({ client: updatedClient, user: latestUserInfo })
    }
})

const deleteClient = asyncHandler(async (req, res) => {    
    const client = await Client.findById(req.params.id)
    let userRole = await Role.findById(req.user.role._id)
    if (!isCurrentAuthUser(req.user, userRole.roletype, client)) { return res.status(401).json({ message: 'Unauthorized!' }) }    

    if (!client) {
        res.status(404)
        throw new Error('Client not found')
    }
    //console.log(client._id)
    await Client.findByIdAndDelete(client._id)
    await User.findByIdAndDelete(client.user._id)//Also delete associated user 
    res.status(200).json({messsage: `Client profile associated with an email ${client.email} has been successfully deleted!`})
})

module.exports={
    getClients,
    getClient,
    registerClient,
    updateClient,
    deleteClient
}