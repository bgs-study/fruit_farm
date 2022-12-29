import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favorites : []
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.favorites = action.payload;
    }
  }
})

export default favoriteSlice.reducer;
export const {setFavorite} = favoriteSlice.actions;