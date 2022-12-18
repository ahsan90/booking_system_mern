const { check, validationResult } = require('express-validator')
//const validator = require('validator')

const validateBookingDate = () => {
    return [
        check('reservation_date').notEmpty().withMessage('Please enter a valid booking date!').isDate()
    ]
}


const validateUSer = () => {
    return [
        check('username').notEmpty().withMessage('Username cannot be empty'),
        check('password', 'Please enter a password of at least 6 characters long').isLength({ min: 6 }),
        check('email').isEmail().withMessage('Please enter a valid email address')
    ]
}

const validateUserData = () => {
    return [
        check('role').notEmpty().withMessage('Select an user role'),
        check('username').notEmpty().withMessage('Username cannot be empty'),
        check('password', 'Please enter a password of at least 6 characters long').isLength({ min: 6 }),
        check('email').isEmail().withMessage('Please enter a valid email address')
    ]
}

const profileValidationAtUserCreation = (name, phone) => {
    const errors = []
    if (name === undefined || name === "") {

        errors.push({ msg: 'Please enter client name', param: "name" })
    }
    if (phone === undefined || phone === "" || isNaN(phone)) {
        errors.push({ msg: 'Please enter client\'s valid phone number', param: "phone" })
    }
    return errors
}


module.exports = {
    validateBookingDate, validateUSer, profileValidationAtUserCreation, validateBookingDate, validateUserData
}