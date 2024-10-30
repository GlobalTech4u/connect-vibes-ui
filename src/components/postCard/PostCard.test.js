import React from "react";
import { screen } from "@testing-library/react";
import PostCard from "./PostCard";
import { renderWithProviders } from "utils/renderWithProvider";

jest.mock("reduxStore/slices/postSlice", () => ({
  deletePost: jest.fn(),
  likePost: jest.fn(),
  sharePost: jest.fn(),
  unlikePost: jest.fn(),
}));

describe("PostCard Component", () => {
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

  test("renders PostCard component", () => {
    renderWithProviders(
      <PostCard post={mockPost} userId={mockUserId} getPosts={mockGetPosts} />
    );
    expect(screen.getByText("This is a test post")).toBeInTheDocument();
  });
});
