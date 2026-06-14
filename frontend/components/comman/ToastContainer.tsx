"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeToast } from "../../store/toastSlice";

const ToastContainer = () => {
  const dispatch = useDispatch();

  const toasts = useSelector(
    (state: RootState) => state.toast.toasts
  );

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 3000);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[320px] rounded-lg px-4 py-3 text-white shadow-lg border-l-4 transition-all duration-300
          ${
            toast.type === "success"
              ? "bg-green-600 border-green-400"
              : toast.type === "error"
              ? "bg-red-600 border-red-400"
              : "bg-yellow-500 border-yellow-300"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;