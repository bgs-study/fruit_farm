import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    date: "",
    totalPrice : 0,
    headCount : 0,
    time:"",
};

const FormDataSlice = createSlice({
    name: 'formData',
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

const FormStore = configureStore({ reducer: FormDataSlice.reducer });
export default FormStore;
export const {getDate,getTotalPrice,getHeadCount,getTime} = FormDataSlice.actions;