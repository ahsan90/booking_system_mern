const express = require('express')
const { check, validationResult } = require('express-validator')
const { getClients, getClient, updateClient, deleteClient, registerClient } = require('../controllers/clientController')
const { validateClient, v, test } = require('../helper/clientHelper')
const clientH = require('../helper/clientHelper')
const { authenticateUser, authAdminUser } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(authenticateUser, authAdminUser, getClients)
router.route('/').post( validateClient(), registerClient)
router.route('/:id').get(getClient).delete(deleteClient).put(updateClient)

module.exports = router



