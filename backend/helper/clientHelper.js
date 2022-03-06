const { check, validationResult } = require('express-validator')
'use strict'

const validateClient = () => {
    return [
        check('username').notEmpty().withMessage('Username cannot be empty'),
        check('password', 'Please enter a password of at least 5 characters long').isLength({ min: 6 }),
        check('email').isEmail().withMessage('Please enter a valid email address'),
        check('firstName').notEmpty().withMessage('First name required'),
        check('firstName').notEmpty().withMessage('last name required'),
        check('phone').notEmpty().withMessage('Phone number required'),
    ]
}


module.exports = {
    validateClient
}