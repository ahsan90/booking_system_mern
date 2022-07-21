const { faker } = require('@faker-js/faker');
const defaultRolesAndUsers = require('./defaultRolesAndUsers');
const User = require('../models/userModel')

const DUMMY_COMMON_USERNAME = 'fakeuser'
const DUMMY_COMMON_PASSWORD = 'fakepass'
/* 
const userData = () => {
    return {
        username: DUMMY_COMMON_USERNAME,
        email: faker.internet.email(),
        role: Math.floor(Math.random() * 2) === 0 ? defaultRolesAndUsers.ADMIN : defaultRolesAndUsers.CLIENT,
        password: DUMMY_COMMON_PASSWORD,
        avatar: faker.internet.avatar()
    }
}

const createProfile = () => {
    return {
        name: faker.name.findName(),
        email: userData.email,
        
    }
}

const createdUsers = () => {
    return Array.from({length: 20},userData)
}

const usersCreated = () => createdUsers().map(x => x)

module.exports = {
    usersCreated, createdUsers
} */