import React from "react";
import { screen } from "@testing-library/react";
import Profile from "./Profile";
import { renderWithProviders } from "utils/renderWithProvider";

describe("Profile Component", () => {
  const initialState = {
    auth: {
      user: {
        _id: "user1",
        firstName: "John",
        lastName: "Doe",
        profilePictures: [{ picture: { path: "/path/to/profile.jpg" } }],
      },
    },
    profile: {
      user: {
        _id: "user1",
        firstName: "John",
        lastName: "Doe",
        profilePictures: [{ picture: { path: "/path/to/profile.jpg" } }],
      },
    },
  };
  test("renders Profile component", () => {
    renderWithProviders(<Profile />, { preloadedState: initialState });
    expect(screen.getByTestId("user-profile")).toBeInTheDocument();
  });
});
