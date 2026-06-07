import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the user data received from the API
export interface UserPayload {
  email: string;
  password?: string; // Password might be hashed or omitted on sign-in success
  encryptionKey: string;
  id: string;
  createdAt: string;
}

interface AuthState {
  user: UserPayload | null;
  message: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  message: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInUser: (state, action: PayloadAction<{ user: UserPayload; message: string }>) => {
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
    },
    // Add other auth actions like logout if needed
  },
});

export const { signInUser } = authSlice.actions;
export default authSlice.reducer;