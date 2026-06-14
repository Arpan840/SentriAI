"use client";

import { useDispatch } from "react-redux";
import { addToast } from "../../store/toastSlice";

export const useToast = () => {
  const dispatch = useDispatch();

  return {
    success: (message: string) =>
      dispatch(
        addToast({
          message,
          type: "success",
        })
      ),

    error: (message: string) =>
      dispatch(
        addToast({
          message,
          type: "error",
        })
      ),

    warning: (message: string) =>
      dispatch(
        addToast({
          message,
          type: "warning",
        })
      ),
  };
};