import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import searchReducer from "reduxStore/slices/searchUserSlice";
import usersReducer from "reduxStore/slices/usersSlice";
import authReducer from "reduxStore/slices/authSlice";
import postReducer from "reduxStore/slices/postSlice";
import { AuthProvider } from "components/authContext/AuthContext";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        search: searchReducer,
        profile: usersReducer,
        auth: authReducer,
        post: postReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Provider store={store}>{children}</Provider>
        </AuthProvider>
      </BrowserRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
