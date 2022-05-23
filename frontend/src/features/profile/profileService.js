import axios from 'axios'

const API_URL = '/api/profiles/'

const create_profile = async (userProfileData) => {
    const response = await axios.post(API_URL, userProfileData)
    //console.log("Hello: "+response.data.toString())
    return response.data
}


const profileService = {
    create_profile,
}

export default profileService