import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import CreatePost from "./CreatePost";
import { WRITE_POST_PLACEHOLDER } from "constants/common.constant";
import store from "reduxStore/store";

describe("CreatePost", () => {
  const mockProps = {
    profilePicture: "profile.jpg",
    getPosts: jest.fn(),
    userId: "123",
    name: "John Doe",
    followersId: ["1", "2"],
  };

  it("should render without crashing", () => {
    const { container } = render(
      <Provider store={store}>
        <CreatePost {...mockProps} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it("should display user profile picture and placeholder text", () => {
    const { getByPlaceholderText, getByAltText } = render(
      <Provider store={store}>
        <CreatePost {...mockProps} />
      </Provider>
    );
    expect(getByAltText("recipe")).toHaveAttribute("src", "profile.jpg");
    expect(getByPlaceholderText(WRITE_POST_PLACEHOLDER)).toBeInTheDocument();
  });

  it("should open CreatePostModal on textarea click", () => {
    const { getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <CreatePost {...mockProps} />
      </Provider>
    );
    fireEvent.click(getByPlaceholderText(WRITE_POST_PLACEHOLDER));
    expect(queryByText("Share")).toBeInTheDocument(); // Assuming 'Share' button is in the modal
  });
});
