import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import {
  APP_NAME,
  NAVBAR_MENU_ITEMS,
  NAVBAR_MENU_ITEMS_MOBILE,
} from "constants/common.constant";
import { renderWithProviders } from "utils/renderWithProvider";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("helpers/auth.helper", () => ({
  logout: jest.fn(),
}));

const renderNavBar = (props) => {
  return renderWithProviders(<NavBar {...props} />);
};

describe("NavBar Component", () => {
  const defaultProps = {
    toggleDrawer: jest.fn(),
    onSearch: jest.fn(),
    firstName: "John",
    profilePicture: "/path/to/profile.jpg",
    onShowSearchResults: jest.fn(),
    userId: "123",
  };

  test("renders NavBar component", () => {
    renderNavBar(defaultProps);
    expect(screen.getByText(APP_NAME)).toBeInTheDocument();
  });

  test("toggles drawer", () => {
    renderNavBar(defaultProps);
    fireEvent.click(screen.getByLabelText("open drawer"));
    expect(defaultProps.toggleDrawer).toHaveBeenCalled();
  });

  test("handles search input", () => {
    renderNavBar(defaultProps);
    const searchInput = screen.getByPlaceholderText("Search…");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(defaultProps.onSearch).toHaveBeenCalled();
    fireEvent.click(searchInput);
    expect(defaultProps.onShowSearchResults).toHaveBeenCalled();
  });

  test("opens and closes profile menu", () => {
    renderNavBar(defaultProps);
    fireEvent.click(screen.getByLabelText("account of current user"));
    expect(screen.getByText(NAVBAR_MENU_ITEMS.PROFILE)).toBeInTheDocument();
    fireEvent.click(screen.getByText(NAVBAR_MENU_ITEMS.PROFILE));
    expect(mockNavigate).toHaveBeenCalledWith("profile?userId=123");
  });

  test("opens and closes mobile menu", () => {
    renderNavBar(defaultProps);
    fireEvent.click(screen.getByLabelText("show more"));
    expect(
      screen.getByText(NAVBAR_MENU_ITEMS_MOBILE.NOTIFICATIONS)
    ).toBeInTheDocument();
    const logoutButtons = screen.getAllByText(NAVBAR_MENU_ITEMS_MOBILE.LOGOUT);
    fireEvent.click(logoutButtons[0]); // Assuming the first one is the correct one
    expect(require("helpers/auth.helper").logout).toHaveBeenCalled();
  });

  test("handles logout", () => {
    renderNavBar(defaultProps);
    fireEvent.click(screen.getByLabelText("account of current user"));
    const logoutButtons = screen.getAllByText(NAVBAR_MENU_ITEMS.LOGOUT);
    fireEvent.click(logoutButtons[0]); // Assuming the first one is the correct one
    expect(require("helpers/auth.helper").logout).toHaveBeenCalled();
  });

  test("navigates to home", () => {
    renderNavBar(defaultProps);
    fireEvent.click(screen.getByText(APP_NAME));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
