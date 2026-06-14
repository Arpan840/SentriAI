import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { analyticsApi } from "../app/services/analyticsApi";
import { authApi } from "@/app/services/AuthApi";

import authReducer from "./authSlice";
import toastReducer from "./toastSlice";

const rootReducer = combineReducers({
  [analyticsApi.reducerPath]: analyticsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  toast: toastReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(analyticsApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default store;