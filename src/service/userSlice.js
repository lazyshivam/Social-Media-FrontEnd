import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn:localStorage.getItem('user') || false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Store user information
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated automatically
export const { loginSuccess, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
