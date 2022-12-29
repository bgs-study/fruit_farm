import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  empty : true,
  search : {
    location : null,
    fruit : null,
    date : null,
  }
}

const optionSlice = createSlice({
  name : 'option',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.empty = false;
      state.search.location = action.payload;
    },
    setFruit: (state, action) => {
      state.empty = false;
      state.search.fruit = action.payload;
    },
    setDate: (state, action) => {
      state.empty = false;
      state.search.date = action.payload;
    },
    reset: (state) => {
      state.empty = true;
      state.search = initialState.search;
    }
  }
})

export default optionSlice.reducer;
export const {setLocation, setFruit, setDate, reset} = optionSlice.actions;