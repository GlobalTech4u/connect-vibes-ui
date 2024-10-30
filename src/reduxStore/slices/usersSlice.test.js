import { configureStore } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import usersReducer, {
  createUser,
  updateUser,
  getUserById,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
} from "./usersSlice";

// Mock axios
const mock = new MockAdapter(axios);

describe("usersSlice", () => {
  const initialState = {
    user: {},
    followings: [],
    followers: [],
    status: "idle",
    error: null,
  };

  let store;

  beforeEach(() => {
    store = configureStore({ reducer: usersReducer });
    mock.reset();
  });

  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle createUser.pending", () => {
    const action = { type: createUser.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle createUser.fulfilled", () => {
    const user = { id: 1, name: "John Doe" };
    const action = { type: createUser.fulfilled.type, payload: user };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.user).toEqual(user);
  });

  it("should handle createUser.rejected", () => {
    const action = {
      type: createUser.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
    expect(state.user).toEqual({});
  });

  it("should handle updateUser.pending", () => {
    const action = { type: updateUser.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle updateUser.fulfilled", () => {
    const user = { id: 1, name: "John Doe" };
    const action = { type: updateUser.fulfilled.type, payload: user };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.user).toEqual(user);
  });

  it("should handle updateUser.rejected", () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
    expect(state.user).toEqual({});
  });

  it("should handle getUserById.pending", () => {
    const action = { type: getUserById.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getUserById.fulfilled", () => {
    const user = { id: 1, name: "John Doe" };
    const action = { type: getUserById.fulfilled.type, payload: user };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.user).toEqual(user);
  });

  it("should handle getUserById.rejected", () => {
    const action = {
      type: getUserById.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
    expect(state.user).toEqual({});
  });

  it("should handle followUser.pending", () => {
    const action = { type: followUser.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle followUser.fulfilled", () => {
    const action = { type: followUser.fulfilled.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle followUser.rejected", () => {
    const action = {
      type: followUser.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle unfollowUser.pending", () => {
    const action = { type: unfollowUser.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle unfollowUser.fulfilled", () => {
    const action = { type: unfollowUser.fulfilled.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
  });

  it("should handle unfollowUser.rejected", () => {
    const action = {
      type: unfollowUser.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle getFollowers.pending", () => {
    const action = { type: getFollowers.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getFollowers.fulfilled", () => {
    const followers = [{ id: 1, name: "John Doe" }];
    const action = { type: getFollowers.fulfilled.type, payload: followers };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.followers).toEqual(followers);
  });

  it("should handle getFollowers.rejected", () => {
    const action = {
      type: getFollowers.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
    expect(state.followers).toEqual([]);
  });

  it("should handle getFollowings.pending", () => {
    const action = { type: getFollowings.pending.type };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getFollowings.fulfilled", () => {
    const followings = [{ id: 1, name: "John Doe" }];
    const action = { type: getFollowings.fulfilled.type, payload: followings };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.followings).toEqual(followings);
  });

  it("should handle getFollowings.rejected", () => {
    const action = {
      type: getFollowings.rejected.type,
      error: { message: "Error" },
    };
    const state = usersReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
    expect(state.followings).toEqual([]);
  });
});
