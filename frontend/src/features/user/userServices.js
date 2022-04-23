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


const userServices = {
    create_user
}

export default userServices