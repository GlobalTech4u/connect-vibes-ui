import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProvider";
import UserCard from "./UserCard";

describe("UserCard Component", () => {
  test("renders UserCard component", () => {
    renderWithProviders(<UserCard />);
    expect(
      screen.getByTestId("user-search-card-container")
    ).toBeInTheDocument();
  });
});
