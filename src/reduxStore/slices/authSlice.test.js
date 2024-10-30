import authReducer, {
  loginUser,
  getCurrentUser,
  getUserFollowers,
  getUserFollowings,
} from "./authSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("authSlice", () => {
  const initialState = {
    user: {},
    followers: [],
    followings: [],
    status: "idle",
    error: null,
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle loginUser.pending", () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle loginUser.fulfilled", () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: { id: 1, name: "John" } },
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.user).toEqual({ id: 1, name: "John" });
  });

  it("should handle loginUser.rejected", () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: "Error" },
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle getCurrentUser.pending", () => {
    const action = { type: getCurrentUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getCurrentUser.fulfilled", () => {
    const action = {
      type: getCurrentUser.fulfilled.type,
      payload: { id: 1, name: "John" },
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.user).toEqual({ id: 1, name: "John" });
  });

  it("should handle getCurrentUser.rejected", () => {
    const action = {
      type: getCurrentUser.rejected.type,
      error: { message: "Error" },
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle getUserFollowers.pending", () => {
    const action = { type: getUserFollowers.pending.type };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getUserFollowers.fulfilled", () => {
    const action = {
      type: getUserFollowers.fulfilled.type,
      payload: [{ id: 1, name: "John" }],
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.followers).toEqual([{ id: 1, name: "John" }]);
  });

  it("should handle getUserFollowers.rejected", () => {
    const action = {
      type: getUserFollowers.rejected.type,
      error: { message: "Error" },
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("should handle getUserFollowings.pending", () => {
    const action = { type: getUserFollowings.pending.type };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getUserFollowings.fulfilled", () => {
    const action = {
      type: getUserFollowings.fulfilled.type,
      payload: [{ id: 1, name: "John" }],
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.followings).toEqual([{ id: 1, name: "John" }]);
  });

  it("should handle getUserFollowings.rejected", () => {
    const action = {
      type: getUserFollowings.rejected.type,
      error: { message: "Error" },
    };
    const state = authReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });
});
