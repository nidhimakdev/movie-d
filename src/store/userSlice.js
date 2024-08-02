import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.isLoggedIn = false;
    },
    createAccount: (state, action) => {
      state.email = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, createAccount } = userSlice.actions;
export default userSlice.reducer;
