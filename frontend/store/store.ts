import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { analyticsApi } from "../app/services/analyticsApi"; // Import the RTK-Query API slice
import authReducer from "./authSlice"; // Import the new auth slice

const rootReducer = combineReducers({
  [analyticsApi.reducerPath]: analyticsApi.reducer, // Add the analytics reducer to root state
  auth: authReducer, // Add the auth reducer to the root state
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(analyticsApi.middleware), // Include RTK-Query middleware
});

// Create a typed hook for use in components
export function useAppDispatch() {
  return useDispatch();
}

export default store;