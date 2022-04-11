const { check, validationResult } = require('express-validator')
const validator = require('validator')

const validateBookingDate = () => {
    return [
        check('reservation_date').notEmpty().withMessage('Required booking date!').isDate()
    ]
}


module.exports = {
    validateBookingDate
}

const validateUSer = () => {
    return [
        check('username').notEmpty().withMessage('Username cannot be empty'),
        check('password', 'Please enter a password of at least 5 characters long').isLength({ min: 6 }),
        check('email').notEmpty().withMessage('Email address required').isEmail().withMessage('Please enter a valid email address')
    ]
}

const profileValidationAtUserCreation = (name, phone) => {
    const errors = []
    if (name === undefined || name === "") {
        errors.push('Please enter client name')
    }
    if (phone === undefined || phone === "" || isNaN(phone)) {
        errors.push('Please enter client\'s valid phone number')
    }
    return errors
}


module.exports = {
    validateBookingDate, validateUSer, profileValidationAtUserCreation
}