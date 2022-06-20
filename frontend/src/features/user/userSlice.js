import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import userServices from './userServices'

const loggedInUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: null,
    singleUserDetails: null,
    profile: null,
    users: [],
    roles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    isAuthorirzed: false
}


// create_user user
export const create_user = createAsyncThunk(
    'users',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.create_user(user, token)
        } catch (error) {
            const message = error.response.data
            //console.log(error.response.status)
            //console.log(error.response.data)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const get_allUsers = createAsyncThunk(
    'users/get_allUsers',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.get_allUsers(token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const get_user = createAsyncThunk(
    'users/get_user',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.get_user(id, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const delete_user = createAsyncThunk(
    'users/delete_user',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.delete_user(id, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const get_allRoles = createAsyncThunk(
    'users/get_allRoles',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.get_allRoles(token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const update_user = createAsyncThunk(
    'users/update',
    async (user, thunkAPI) => {
        const {id, userData} = user
        //console.log(userData)
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.update_user(id, userData, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const create_user_profile = createAsyncThunk(
    'users/new_profile',
    async (profile, thunkAPI) => {
        const { userId, profileData } = profile
        //console.log(userId)
        try {
            const token = thunkAPI.getState().auth.loggedInUser.token
            return await userServices.create_user_profile(userId, profileData, token)
        } catch (error) {
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(create_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
                state.users.push(action.payload)
                //console.log(action.payload)
                toast.success(`New User Added with a username: ${action.payload.username}`)
            })
            .addCase(create_user.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
                state.message = action.payload
                toast.error(state.message?.error);
                //state.users = null
            })
            .addCase(update_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
                state.users = state.users.map((user) => user._id === action.payload._id ? action.payload : user)
                //console.log(action.payload)
                
                toast.success(`User updated successfully!`)
            })
            .addCase(update_user.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
                state.message = action.payload
                toast.error(state.message.error)
                if (state.message?.message) {
                    toast.error(state.message?.message)
                }
                //state.users = null
            })
            .addCase(get_allUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_allUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(get_allUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(get_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.singleUserDetails = action.payload
            })
            .addCase(get_user.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.singleUserDetails = null
                state.message = action.payload
            })
            .addCase(delete_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_user.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = state.users.filter(x => x._id !== action.payload.id)
                toast.success('User deleted successfully!')
            })
            .addCase(delete_user.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                if (state.message?.message) {
                    toast.error(state.message?.message)
                }
            })
            .addCase(create_user_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_user_profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.singleUserDetails  = action.payload
                toast.success('Profile Added successfully!')
            })
            .addCase(create_user_profile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                if (state.message?.message) {
                    toast.error(state.message?.message)
                }
            })
            .addCase(get_allRoles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_allRoles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.roles = action.payload
            })
            .addCase(get_allRoles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
    }
})


export const { resetUser } = userSlice.actions
export default userSlice.reducer