import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AuthProvider, AuthContext } from "./AuthContext";
import { getUser } from "helpers/user.helper";
import initializeSocket from "utils/socket";
import initializeAxios from "services/axios.service";

jest.mock("helpers/user.helper");
jest.mock("utils/socket");
jest.mock("services/axios.service");

describe("AuthProvider", () => {
  const mockUser = {
    _id: "1",
    token: "mockToken",
  };

  beforeEach(() => {
    getUser.mockReturnValue(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should render without crashing", () => {
    const { container } = render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it("should set initial state correctly", async () => {
    let contextValue;
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(contextValue.token).toBe("mockToken");
      expect(contextValue.isLoggedIn).toBe(true);
      expect(contextValue.loading).toBe(false);
    });
  });

  it("should call initializeSocket and initializeAxios with correct arguments", async () => {
    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(initializeSocket).toHaveBeenCalledWith("1");
      expect(initializeAxios).toHaveBeenCalledWith("mockToken");
    });
  });

  it("should handle no user in localStorage", async () => {
    localStorage.removeItem("user");
    getUser.mockReturnValue(null);

    let contextValue;
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(contextValue.token).toBeNull();
      expect(contextValue.isLoggedIn).toBe(false);
      expect(contextValue.loading).toBe(false);
    });
  });

  it("should update state when token changes", async () => {
    let contextValue;
    const { rerender } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(contextValue.token).toBe("mockToken");
    });

    const newUser = { _id: "2", token: "newMockToken" };
    localStorage.setItem("user", JSON.stringify(newUser));
    getUser.mockReturnValue(newUser);

    rerender(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(contextValue.token).toBe("newMockToken");
    });
  });
});
