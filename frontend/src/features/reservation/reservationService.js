import axios from 'axios'

const API_URL = '/api/bookings/'


const get_all_bookings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const create_booking = async (bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, bookingData, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const delete_booking = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const get_bookings_by_user = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'byuser', userId, config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const get_all_booked_dates = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'booked', config)
    //console.log("Hello: "+response.data.toString())
    return response.data
}

const search_bookings = async (searchText, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'search?searchQuery=' + searchText, config)
    return response.data
}
const search_bookings_by_user = async (payload, token) => {
    const { userId, searchText } = payload
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'search?searchQuery=' + searchText, { userId }, config)
    return response.data
}


const reservationService = {
    create_booking, delete_booking, get_bookings_by_user, get_all_bookings, get_all_booked_dates, search_bookings, search_bookings_by_user
}

export default reservationService