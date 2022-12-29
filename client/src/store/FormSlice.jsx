import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: '',
    totalPrice : 0,
    headCount : 0,
    startTime:'',
    endTime:'',
    personnel : 0,
    price: 0,
    timeId: 0,
};

const formSlice = createSlice({
    name: 'form',
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
        getStartTime(state,action){
            state.startTime = action.payload;
        },
        getEndTime(state,action){
            state.endTime = action.payload;
        },
        getPersonnel(state,action){
            state.personnel = action.payload;
        },
        getPrice(state,action){
            state.price = action.payload;
        },
        getTimeId(state,action){
            state.timeId = action.payload;
        },
        initDate(state, action){
            state.date = '';
        }
    }
});

export default formSlice.reducer;
export const {getDate,getTotalPrice,getHeadCount,getStartTime,getEndTime,getPersonnel,getPrice,getTimeId,initDate} = formSlice.actions;