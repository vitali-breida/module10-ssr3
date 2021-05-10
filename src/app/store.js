import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import dialogsReducer from "../features/dialogsSlice";

const createStore = (preloadedState) =>{
  return configureStore({
    reducer: {
      movies: moviesReducer,
      dialogs: dialogsReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
} 

export default createStore;