import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userServices from './userServices'

//const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null
}

// create_user user 
export const create_user = createAsyncThunk(
    'users',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userServices.create_user(user, token)
        } catch (error) {
            const message = error.response.data
            /* const message = (error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString() || error.response.data.errors.msg */
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const edit_user = createAsyncThunk(
    
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.push(action.payload)
                console.log(action.payload)
            })
            .addCase(create_user.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})


export const { reset } = userSlice.actions
export default userSlice.reducer