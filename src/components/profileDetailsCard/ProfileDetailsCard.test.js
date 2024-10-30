import React from "react";
import { screen } from "@testing-library/react";
import ProfileDetailsCard from "./ProfileDetailsCard";
import { renderWithProviders } from "utils/renderWithProvider";

describe("ProfileDetailsCard Component", () => {
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
  test("renders ProfileDetailsCard component", () => {
    renderWithProviders(<ProfileDetailsCard />, {
      preloadedState: initialState,
    });
    expect(screen.getByTestId("profile-details-card")).toBeInTheDocument();
  });
});
