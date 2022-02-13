const express = require('express')
const router = express.Router()
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController')

router.route('/').get(getUsers).post(createUser)
router.route('/:id').delete(deleteUser).put(updateUser)

module.exports = router