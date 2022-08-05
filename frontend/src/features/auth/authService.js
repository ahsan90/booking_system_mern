import axios from 'axios'

const devEnv = process.env.NODE_ENV === "production"

const base_url = 'https://booking-mern-api.herokuapp.com'

const API_URL = `${base_url}/api/auth/`


const login = async (userData) => {

    console.log('h- ' + API_URL)
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    logout
}

export default authService