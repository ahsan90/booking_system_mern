import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import profileService from './profileService'

//const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    profile: null,
    profiles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    isAuthorirzed: false
}


// create_user user
export const create_profile = createAsyncThunk(
    'profiles',
    async (userProfileData, thunkAPI) => {
        try {
            return await profileService.create_profile(userProfileData)
        } catch (error) {
            const message = error.response.data
            //console.log(error.response.status)
            //console.log(error.response.data)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const get_allProfiles = createAsyncThunk(
    'profiles/get_allProfiles',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await profileService.get_profiles(token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const edit_profile = createAsyncThunk(

)
export const delete_profile = createAsyncThunk(
    
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_allProfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_allProfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profiles = action.payload
            })
            .addCase(get_allProfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(create_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(create_profile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })


    }
})


export const { reset } = profileSlice.actions
export default profileSlice.reducer