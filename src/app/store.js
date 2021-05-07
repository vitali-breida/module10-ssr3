import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import dialogsReducer from "../features/dialogs/dialogsSlice";
// import createSagaMiddleware from 'redux-saga';

// const sagaMiddleware = createSagaMiddleware();

const createStore = (preloadedState) =>{
  return configureStore({
    reducer: {
      movies: moviesReducer,
      dialogs: dialogsReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
} 

export default createStore;