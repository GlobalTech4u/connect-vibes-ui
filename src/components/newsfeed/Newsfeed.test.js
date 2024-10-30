import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProvider";
import Newsfeed from "./Newsfeed";

describe("Newsfeed Component", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: "user1",
        firstName: "John",
        lastName: "Doe",
        profilePictures: [{ picture: { path: "/path/to/profile.jpg" } }],
      },
    },
    post: { newsFeed: [] },
    profile: { followers: [], followings: [] },
  };

  test("renders Newsfeed component", () => {
    renderWithProviders(<Newsfeed />, { preloadedState });
    expect(screen.getByTestId("news-feeds")).toBeInTheDocument();
  });
});
