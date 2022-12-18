import axios from 'axios'

const devEnv = process.env.NODE_ENV === "production"

const base_url = devEnv ? 'https://booking-system-mern-api.vercel.app' : ''

const API_URL = `${base_url}/api/auth/`


const login = async (userData) => {

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