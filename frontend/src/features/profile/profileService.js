import axios from 'axios'

const API_URL = '/api/profiles/'

const create_profile = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, userData, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const delete_profile = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const get_profiles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const get_profile = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + id, config)
    return response.data
}


const profileService = {
    create_profile, get_profile, get_profiles, delete_profile
}

export default profileService