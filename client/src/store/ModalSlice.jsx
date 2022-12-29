import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: (state) => {
			state.modal = true;
		},
		closeModal: (state) => {
			state.modal = false;
		},
	},
});

export default modalSlice.reducer;
export const { showModal, closeModal } = modalSlice.actions;
