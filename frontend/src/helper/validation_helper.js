

const FIELD_VALUES = {
    username: 'username',
    email: 'email',
    username_or_email: 'username_or_email',
    password: 'password',
    name: 'name',
    phone: 'phone',
    role: 'role'
}

const validateFormError = (validationErrors) => {
    const errors = {}
    
    const { message, confirmPassError } = validationErrors
    //console.log(message)
    if (message !== undefined && message.errors !== null) {
        message?.errors?.forEach(element => {
            if (element.param === FIELD_VALUES.username_or_email) {
                errors.username_or_email = element.msg
            }
            if (element.param === FIELD_VALUES.username) {
                errors.username = element.msg
            }
            if (element.param === FIELD_VALUES.email) {
                errors.email = element.msg
            }
            if (element.param === FIELD_VALUES.password) {
                errors.password = element.msg
            }
            if (element.param === FIELD_VALUES.name) {
                errors.name = element.msg
            }
            if (element.param === FIELD_VALUES.phone) {
                errors.phone = element.msg
            }
            if (element.param === FIELD_VALUES.role) {
                errors.role = element.msg
                //console.log(element.msg)
            } 
            
        });
    }
    if (confirmPassError !== undefined && confirmPassError !== '') {
        errors.confirmPassError = confirmPassError
    }
    //console.log(errors)
    return errors
}


const validation_helper = {
    validateFormError
}

export default validation_helper