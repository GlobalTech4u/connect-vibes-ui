import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { createUser } from "reduxStore/slices/usersSlice";
import LABELS from "constants/label.constant";
import { renderWithProviders } from "utils/renderWithProvider";

jest.mock("reduxStore/slices/usersSlice", () => ({
  createUser: jest.fn(),
}));

describe("SignUp Component", () => {
  test("renders SignUp component", () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText(LABELS.SIGNUP_TITLE)).toBeInTheDocument();
  });
});
