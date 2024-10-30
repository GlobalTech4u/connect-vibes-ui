import React from "react";
import { screen } from "@testing-library/react";
import PostsContainer from "./PostsContainer";
import { renderWithProviders } from "utils/renderWithProvider";

describe("PostContainer Component", () => {
  const mockPost = {
    _id: "post1",
    firstName: "John",
    lastName: "Doe",
    profilePicture: { picture: { path: "/path/to/profile.jpg" } },
    content: "This is a test post",
    attachments: [
      { _id: "attachment1", attachment: { path: "/path/to/image.jpg" } },
    ],
    likes: [{ userId: "user1" }],
    updatedAt: "2024-10-30T07:20:06Z",
  };
  const mockUserId = "user1";
  const mockGetPosts = jest.fn();

  test("renders PostContainer component", () => {
    renderWithProviders(
      <PostsContainer
        post={mockPost}
        userId={mockUserId}
        getPosts={mockGetPosts}
      />
    );
    expect(screen.getByTestId("post-container")).toBeInTheDocument();
  });
});
