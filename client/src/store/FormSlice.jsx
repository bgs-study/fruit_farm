import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: new Date().toISOString().substring(0,10),
    totalPrice : 0,
    headCount : 0,
    time:"",
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        getDate(state,action) {
            state.date = action.payload;
        },
        getTotalPrice(state,action) {
            state.totalPrice = action.payload;
        },
        getHeadCount(state,action) {
            state.headCount = action.payload;
        },
        getTime(state,action){
            state.time = action.payload;
        }
    }
});

export default formSlice.reducer;
export const {getDate,getTotalPrice,getHeadCount,getTime} = formSlice.actions;