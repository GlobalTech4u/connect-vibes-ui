import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAxiosLoader } from "use-axios-loader";
import App from "./App";
import store from "reduxStore/store";
import { AuthProvider } from "components/authContext/AuthContext";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("use-axios-loader");

// Create a new instance of MockAdapter on the default axios instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply(200, {
  users: [{ _id: 1, firstName: "John" }],
});

describe("App Component", () => {
  it("renders loading spinner when loading is true", async () => {
    useAxiosLoader.mockReturnValue([true]);

    await act(async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      );
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders AppRoutes when loading is false", async () => {
    useAxiosLoader.mockReturnValue([false]);

    await act(async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      );
    });

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();
  });

  it("renders the provider components correctly", async () => {
    useAxiosLoader.mockReturnValue([false]);

    await act(async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      );
    });

    expect(screen.getByTestId("app-routes")).toBeInTheDocument();
  });

  it("handles axios mock correctly", async () => {
    useAxiosLoader.mockReturnValue([false]);

    await act(async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      );
    });

    // Assuming AppRoutes or some component inside it makes a call to /users
    const response = await axios.get("/users");
    expect(response.data.users[0].firstName).toBe("John");
  });
});
