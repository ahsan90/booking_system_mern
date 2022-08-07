import axios from 'axios'

const devEnv = process.env.NODE_ENV === "production"

const base_url = devEnv ? 'https://booking-mern-api.herokuapp.com' : ''

const API_URL = `${base_url}/api/profiles/`

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

const search_profiles = async (searchText, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'search?searchQuery=' + searchText, config)
    return response.data
}



const profileService = {
    create_profile, get_profile, get_profiles, update_profile, delete_profile, search_profiles
}

export default profileService