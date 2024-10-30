import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FriendsCard from "./FriendsCard";
import { getFullName } from "helpers/user.helper";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("helpers/user.helper", () => ({
  getFullName: jest.fn(),
}));

const renderComponent = (props) => {
  return render(
    <BrowserRouter>
      <FriendsCard {...props} />
    </BrowserRouter>
  );
};

describe("FriendsCard Component", () => {
  const mockNavigate = jest.fn();
  const mockUsers = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      profilePicture: { picture: { path: "path/to/picture1.jpg" } },
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Smith",
      profilePicture: { picture: { path: "path/to/picture2.jpg" } },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getFullName.mockImplementation(
      (firstName, lastName) => `${firstName} ${lastName}`
    );
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  it("should render without crashing", () => {
    renderComponent({ title: "Friends", users: mockUsers, isSticky: false });
    expect(screen.getByText("Friends")).toBeInTheDocument();
  });

  it("should not render if users list is empty", () => {
    const { container } = renderComponent({
      title: "Friends",
      users: [],
      isSticky: false,
    });
    expect(container.firstChild).toBeNull();
  });

  it("should display user names correctly", () => {
    renderComponent({ title: "Friends", users: mockUsers, isSticky: false });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("should navigate to user profile on avatar click", () => {
    renderComponent({ title: "Friends", users: mockUsers, isSticky: false });
    const avatar = screen.getAllByRole("img")[0];
    fireEvent.click(avatar);
    expect(mockNavigate).toHaveBeenCalledWith("/profile?userId=1");
  });

  it("should navigate to user profile on name click", () => {
    renderComponent({ title: "Friends", users: mockUsers, isSticky: false });
    const name = screen.getByText("John Doe");
    fireEvent.click(name);
    expect(mockNavigate).toHaveBeenCalledWith("/profile?userId=1");
  });

  it("should apply sticky class when isSticky is true", () => {
    const { container } = renderComponent({
      title: "Friends",
      users: mockUsers,
      isSticky: true,
    });
    expect(container.firstChild).toHaveClass("left-container-sticky");
  });
});
