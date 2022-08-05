import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { useNavigate } from 'react-router-dom'

const user = JSON.parse(localStorage.getItem('user'))
const devEnv = process.env.NODE_ENV === "production"


const initialState = {
    loggedInUser: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null
}
// Login user 
export const login = createAsyncThunk(
    'auth/login',
    async (loggedInUser, thunkAPI) => {
    
        try {
            return await authService.login(loggedInUser)
        } catch (error) {
            /* const message = (error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString() */
            const message = error.response.data
            //console.log(message)
            //message.errors.map(x => console.log(x.msg))
            //console.log(message.errors[0].msg)
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//Logout user
/* export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout()
    }
) */

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = null
        },
        logout: (state) => {
            localStorage.removeItem('user')
            state.loggedInUser = null
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.loggedInUser = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.loggedInUser = null
            })
        /* .addCase(logout.fulfilled, (state, action) => {
            state.loggedInUser = null
        }) */
    }
})

export const { resetAuth, logout } = authSlice.actions
export default authSlice.reducer