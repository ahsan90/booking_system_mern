import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import profileReducer from '../features/profile/profileSlice'
import reservationReducer from '../features/reservation/reservationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    reservation: reservationReducer
  },
});
