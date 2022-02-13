const asyncHandler = require('express-async-handler')


const getUsers = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get users' })
})

const createUser = asyncHandler( async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Create user' })
})

const updateUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Update user ${req.params.id}` })
})

const deleteUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Delete user ${req.params.id}` })
})

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}