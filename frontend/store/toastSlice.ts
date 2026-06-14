import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: ToastType;
      }>
    ) => {
      state.toasts.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type,
      });
    },

    removeToast: (
      state,
      action: PayloadAction<number>
    ) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const {
  addToast,
  removeToast,
} = toastSlice.actions;

export default toastSlice.reducer;