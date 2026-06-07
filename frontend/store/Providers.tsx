"use client";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import the new auth slice

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer, // Add the auth reducer to the root state
  }),
});

export function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}