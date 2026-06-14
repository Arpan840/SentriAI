"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // import existing store

export function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}