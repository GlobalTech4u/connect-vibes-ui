import React from "react";
import { render } from "@testing-library/react";
import AboutCard from "./AboutCard";
import "@testing-library/jest-dom/extend-expect";

describe("AboutCard", () => {
  const user = {
    _id: "1",
    aboutMe: "This is about me",
    jobTitle: "Software Engineer",
    relationshipStatus: "Single",
    city: "New York",
    country: "USA",
  };

  it("should render without crashing", () => {
    const { container } = render(<AboutCard user={user} />);
    expect(container).toBeInTheDocument();
  });

  it("should display user aboutMe", () => {
    const { getByText } = render(<AboutCard user={user} />);
    expect(getByText("This is about me")).toBeInTheDocument();
  });

  it("should display user jobTitle", () => {
    const { getByText } = render(<AboutCard user={user} />);
    expect(getByText("Software Engineer")).toBeInTheDocument();
  });

  it("should display user relationshipStatus", () => {
    const { getByText } = render(<AboutCard user={user} />);
    expect(getByText("Single")).toBeInTheDocument();
  });

  it("should display user city", () => {
    const { getByText } = render(<AboutCard user={user} />);
    expect(getByText("New York")).toBeInTheDocument();
  });

  it("should display user country", () => {
    const { getByText } = render(<AboutCard user={user} />);
    expect(getByText("USA")).toBeInTheDocument();
  });

  it("should not render if all user fields are empty", () => {
    const emptyUser = {
      _id: "1",
      aboutMe: "",
      jobTitle: "",
      relationshipStatus: "",
      city: "",
      country: "",
    };
    const { container } = render(<AboutCard user={emptyUser} />);
    expect(container.firstChild).toBeNull();
  });

  it("should apply sticky class when isSticky is true", () => {
    const { container } = render(<AboutCard user={user} isSticky={true} />);
    expect(container.firstChild).toHaveClass("left-container-sticky");
  });

  it("should not apply sticky class when isSticky is false", () => {
    const { container } = render(<AboutCard user={user} isSticky={false} />);
    expect(container.firstChild).not.toHaveClass("left-container-sticky");
  });
});
