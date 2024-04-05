import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
};

const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.userDetails = action.payload; // Store user information
    },
   
  },
});

// Action creators are generated automatically
export const { addProfile } = userProfileSlice.actions;

// Export the reducer
export default userProfileSlice.reducer;
