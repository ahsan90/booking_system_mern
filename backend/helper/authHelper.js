const { check, validationResult } = require('express-validator')

const loginFormValidation = () => {
    return [
        check('username_or_email').notEmpty().withMessage('Enter your registered username or email'),
        check('password').notEmpty().withMessage('Enter password')
    ]
}

module.exports = {
    loginFormValidation
}