import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "pages/Layout/sagas"
import { apiSlice } from "./api/apiSlice"
import layoutReducer from "../pages/Layout/layoutSlice"

const sagaMiddleware = createSagaMiddleware()

// Create the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layout: layoutReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(sagaMiddleware),
  devTools: true,
})

sagaMiddleware.run(rootSaga)

export default store
