import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../service/userSlice'
import userProfileReducer from '../service/userProfileSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: userProfileReducer
  },
})


