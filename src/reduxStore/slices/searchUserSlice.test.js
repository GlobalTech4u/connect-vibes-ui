import { configureStore } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import searchUserReducer, { getUsers } from "./searchUserSlice";
import { URLS_CONSTANT } from "constants/url.constant";

// Mock axios
const mock = new MockAdapter(axios);

describe("searchUserSlice", () => {
  const initialState = {
    users: [],
    user: {},
    status: "idle",
    error: null,
  };

  let store;

  beforeEach(() => {
    store = configureStore({ reducer: searchUserReducer });
    mock.reset();
  });

  it("should handle initial state", () => {
    expect(searchUserReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle getUsers.pending", () => {
    const action = { type: getUsers.pending.type };
    const state = searchUserReducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("should handle getUsers.fulfilled", () => {
    const users = [{ id: 1, name: "John Doe" }];
    const action = { type: getUsers.fulfilled.type, payload: users };
    const state = searchUserReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.users).toEqual(users);
  });

  it("should handle getUsers.rejected", () => {
    const action = {
      type: getUsers.rejected.type,
      error: { message: "Error" },
    };
    const state = searchUserReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
    expect(state.users).toEqual([]);
  });
});
