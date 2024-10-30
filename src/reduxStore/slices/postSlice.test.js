import postReducer, {
  fetchPostsByUserId,
  likePost,
  unlikePost,
  fetchNewsFeeds,
  deletePost,
  createPost,
  sharePost,
} from "./postSlice";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { URLS_CONSTANT } from "constants/url.constant";

const mock = new MockAdapter(axios);

describe("postSlice", () => {
  const initialState = {
    newsFeed: [],
    posts: [],
    status: "idle",
    error: null,
  };

  beforeEach(() => {
    mock.reset(); // Reset mock adapter before each test
  });

  it("should handle initial state", () => {
    expect(postReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchPostsByUserId.pending", () => {
    const action = { type: fetchPostsByUserId.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle fetchPostsByUserId.fulfilled", () => {
    const action = {
      type: fetchPostsByUserId.fulfilled.type,
      payload: [{ id: 1, content: "Post" }],
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.posts).toEqual([{ id: 1, content: "Post" }]);
  });

  it("should handle fetchPostsByUserId.rejected", () => {
    const action = {
      type: fetchPostsByUserId.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle fetchNewsFeeds.pending", () => {
    const action = { type: fetchNewsFeeds.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle fetchNewsFeeds.fulfilled", () => {
    const action = {
      type: fetchNewsFeeds.fulfilled.type,
      payload: [{ id: 1, content: "Post" }],
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.newsFeed).toEqual([{ id: 1, content: "Post" }]);
  });

  it("should handle fetchNewsFeeds.rejected", () => {
    const action = {
      type: fetchNewsFeeds.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle likePost.pending", () => {
    const action = { type: likePost.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle likePost.fulfilled", () => {
    const action = { type: likePost.fulfilled.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle likePost.rejected", () => {
    const action = {
      type: likePost.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle unlikePost.pending", () => {
    const action = { type: unlikePost.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle unlikePost.fulfilled", () => {
    const action = { type: unlikePost.fulfilled.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle unlikePost.rejected", () => {
    const action = {
      type: unlikePost.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle deletePost.pending", () => {
    const action = { type: deletePost.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle deletePost.fulfilled", () => {
    const action = { type: deletePost.fulfilled.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle deletePost.rejected", () => {
    const action = {
      type: deletePost.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle createPost.pending", () => {
    const action = { type: createPost.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle createPost.fulfilled", () => {
    const action = { type: createPost.fulfilled.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle createPost.rejected", () => {
    const action = {
      type: createPost.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle sharePost.pending", () => {
    const action = { type: sharePost.pending.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle sharePost.fulfilled", () => {
    const action = { type: sharePost.fulfilled.type };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle sharePost.rejected", () => {
    const action = {
      type: sharePost.rejected.type,
      error: { message: "Error" },
    };
    const state = postReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });
});
