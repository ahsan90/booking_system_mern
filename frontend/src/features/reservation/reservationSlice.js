import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import reservationService from './reservationService'

const initialState = {
    booking: null,
    bookings: [],
    bookedDates: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: [],
    isAuthorirzed: false
}


// get all bookings
export const get_all_bookings = createAsyncThunk(
    'bookings/get_all_booking',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.get_all_bookings(token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// create_booking
export const create_booking = createAsyncThunk(
    'create_booking',
    async (bookingData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.create_booking(bookingData, token)
        } catch (error) {
            const message = error.response.data
            //console.log(error.response.status)
            //console.log(error.response.data)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update_booking
export const update_booking = createAsyncThunk(
    'update_booking',
    async (bookingData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.update_booking(bookingData, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const delete_booking = createAsyncThunk(
    'delete_booking',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.delete_booking(id, token)
        } catch (error) {
            const message = error.response.data
            //console.log(error.response.status)
            //console.log(error.response.data)
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const get_bookings_by_user = createAsyncThunk(
    'bookings/get_bookings_by_user',
    async (id, thunkAPI) => {
        const userIdObj = { userId: id }
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.get_bookings_by_user(userIdObj, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const get_all_booked_dates = createAsyncThunk(
    'bookings/get_booked_dates',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.get_all_booked_dates(token)
        } catch (error) {
            const message = error.response.data
            //console.log(error.response.status)
            //console.log(error.response.data)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const search_bookings = createAsyncThunk(
    'bookings/search',
    async (searchText, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.search_bookings(searchText, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const search_bookings_by_user = createAsyncThunk(
    'bookings/search_by_user',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await reservationService.search_bookings_by_user(payload, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        resetReservation: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_bookings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_bookings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bookings = action.payload
            })
            .addCase(get_all_bookings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                toast.error(state.message?.error)
            })
            .addCase(create_booking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_booking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bookings.push(action.payload)
                state.booking = action.payload
                toast.success('Booking Created Successfully')
            })
            .addCase(create_booking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.booking = null
                if (state.message.errors !== undefined && state.message.errors?.length > 0) {
                    toast.error(state.message.errors[0].msg)
                } else {
                    toast.error(state.message.error)
                }
            })
            .addCase(delete_booking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_booking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bookings = state.bookings.filter(booking => booking._id !== action.payload._id)
                toast.success('Booking Deleted Successfully')
            })
            .addCase(delete_booking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                toast.error(state.message.errors)
                state.message = ''
            })
            .addCase(get_bookings_by_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_bookings_by_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bookings = action.payload
            })
            .addCase(get_bookings_by_user.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                toast.error(state.message?.error)
            })
            .addCase(get_all_booked_dates.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_booked_dates.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bookedDates = action.payload
            })
            .addCase(get_all_booked_dates.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                toast.error(state.message?.error)
            })
            .addCase(search_bookings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(search_bookings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bookings = action.payload
                state.message = null
                state.booking = null
            })
            .addCase(search_bookings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.bookings = []
                state.booking = null
            })
            .addCase(search_bookings_by_user.pending, (state, action) => {
                state.isLoading = false
            })
            .addCase(search_bookings_by_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bookings = action.payload
                state.message = null
                state.booking = null
            })
            .addCase(search_bookings_by_user.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.bookings = []
                state.booking = null
            })
            .addCase(update_booking.pending, (state, action) => {
                state.isLoading = true
                state.booking = null
            })
            .addCase(update_booking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.booking = action.payload
                //console.log(action.payload)
                state.bookings = state.bookings.map(x => x._id === action.payload._id ? action.payload : x)
                state.message = null
                toast.success('Booking Updated Successfully!')
            })
            .addCase(update_booking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.booking = null
            })

    }
})

export const { resetReservation } = reservationSlice.actions
export default reservationSlice.reducer