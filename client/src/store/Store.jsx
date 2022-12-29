import { configureStore } from "@reduxjs/toolkit";
import formReducers from "./FormSlice";
import modalReducers from "./ModalSlice";
import optionReducers from "./OptionSlice";
import favoriteReducers from "./FavoriteSlice";

const store = configureStore({
  reducer: {
    modal: modalReducers,
    form : formReducers,
    option : optionReducers,
    favorite : favoriteReducers,
  },
});

export default store;