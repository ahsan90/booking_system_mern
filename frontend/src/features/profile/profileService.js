import axios from 'axios'

const API_URL = '/api/profiles/'

const create_profile = async (userProfileData) => {
    const response = await axios.post(API_URL, userProfileData)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const get_profile = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + id, config)
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
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const update_profile = async (id, profileData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + id, profileData, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}



const profileService = {
    create_profile, get_profile, get_profiles, update_profile
}

export default profileService