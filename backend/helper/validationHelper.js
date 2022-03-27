const { check } = require('express-validator')


const validateBookingDate = () => {
    return [
        check('reservation_date').notEmpty().withMessage('Required booking date!').isDate()
    ]
}


module.exports = {
    validateBookingDate
}