import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {},
  reducers: {
    addToWatchlist: (state, action) => {
      const { email, movie } = action.payload;
      if (!state[email]) {
        state[email] = [];
      }
      state[email].push(movie);
    },
    removeFromWatchlist: (state, action) => {
      const { email, movieId } = action.payload;
      if (state[email]) {
        state[email] = state[email].filter(movie => movie.id !== movieId);
      }
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
