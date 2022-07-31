import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { profile_url } from 'gravatar'
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
// create_user user
export const get_profile = createAsyncThunk(
    'get_profile',
    async (profileId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await profileService.get_profile(profileId, token)
        } catch (error) {
            const message = error.response.data
            //console.log(error.response.status)
            //console.log(error.response.data)
            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const get_allProfiles = createAsyncThunk(
    'get_allProfiles',
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


export const update_profile = createAsyncThunk(
    'update_profile',
    async (profile, thunkAPI) => { 
        try {
            const { profileData, id } = profile
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await profileService.update_profile(id, profileData, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const delete_profile = createAsyncThunk(
    'delete_profile',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await profileService.delete_profile(id, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const search_profiles = createAsyncThunk(
    'search_profiles',
    async (searchText, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await profileService.search_profiles(searchText, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(get_profile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(get_allProfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_allProfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.profile = null
                state.message = null
                state.profiles = action.payload
            })
            .addCase(get_allProfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.profile = null
                state.profiles = []
                state.message = action.payload
            })
            .addCase(create_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.profile = action.payload
                state.message = null
                //state.profiles.push(action.payload)
                toast.success(`New Client (${action.payload.name}) Added Successfully!`)
            })
            .addCase(create_profile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.profile = null
                state.message = action.payload
                toast.error(action.payload.error)
            })
            .addCase(update_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.profile = action.payload
                //state.profiles = state.profiles.map(profile => profile._id === action.payload._id? action.payload : profile)
                toast.success('Profile updated!')
            })
            .addCase(update_profile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.profile = null
                state.message = action.payload
                toast.error(state.message?.error)
            })
            .addCase(delete_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.profile = action.payload
                //state.profiles = state.profiles.filter(prof => prof._id !== state.profile._id)
                toast.success('Profile deleted!')
            })
            .addCase(delete_profile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                toast.error(state.message.error)
            })
            .addCase(search_profiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(search_profiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.profile = null
                state.profiles = action.payload
            })
            .addCase(search_profiles.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer