import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../service/userSlice'
import userProfileReducer from '../service/userProfileSlice'
import postReducer from '../service/postSlice'
import commentReducer from '../service/commentSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: userProfileReducer,
    post: postReducer,
    comment:commentReducer
  },
})


