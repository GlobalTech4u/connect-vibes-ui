import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProvider";
import Login from "./Login";
import LABELS from "constants/label.constant";

jest.mock("reduxStore/slices/authSlice", () => ({
  loginUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login component", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(LABELS.LOGIN_TITLE)).toBeInTheDocument();
  });

  test("renders email and password fields", () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("redirects to sign-up page on link click", () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByText(LABELS.LOGIN_FOOTER_LINK));
    expect(mockNavigate).toHaveBeenCalledWith("/sign-up");
  });
});
