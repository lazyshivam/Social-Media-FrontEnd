import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
};

const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.userDetails = action.payload; 
    },
    updateProfile: (state, action) => {
      const postId = action.payload;
      // Check if user details exist and if postLiked array exists
      if (state.userDetails && state.userDetails.postLiked) {
        // Check if postId already exists in postLiked array
        const index = state.userDetails.postLiked.indexOf(postId);
        if (index === -1) {
          // If postId doesn't exist, add it to the postLiked array
          state.userDetails.postLiked.push(postId);
        } else {
          // If postId exists, remove it from the postLiked array
          state.userDetails.postLiked.splice(index, 1);
        }
      }
    },
  },
});

// Action creators are generated automatically
export const { addProfile, updateProfile } = userProfileSlice.actions;

// Export the reducer
export default userProfileSlice.reducer;
