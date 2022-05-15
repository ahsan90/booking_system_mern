import axios from 'axios'

const API_URL = '/api/users/'

const create_user = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, userData, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}
const update_user = async (id, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + id, userData, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}
const get_user = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + id, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const delete_user = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const get_allUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}
const get_allRoles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL +'roles', config)
    
    return response.data
}


const userServices = {
    create_user, update_user, get_allUsers, get_user, delete_user, get_allRoles
}

export default userServices