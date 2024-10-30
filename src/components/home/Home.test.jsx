import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/renderWithProvider";
import Home from "./Home";

test("renders home component", () => {
  renderWithProviders(<Home />);
  expect(screen.getByTestId("home-component")).toBeInTheDocument();
});
