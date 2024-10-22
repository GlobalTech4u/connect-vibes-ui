import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URLS_CONSTANT } from "constants/url.constant";
import { axios } from "services/axios.service";

// Async action to fetch all users data by search
export const getUsers = createAsyncThunk("search/getUsers", async (payload) => {
  return axios
    .get(
      URLS_CONSTANT.users_search.replace("{searchQuery}", payload?.searchQuery)
    )
    .then((res) => {
      if (res?.status === 200) {
        return res?.data?.users;
      }
    });
});

const searchUserSlice = createSlice({
  name: "search",
  initialState: {
    users: [],
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.users = [];
        state.error = action.error.message;
      });
  },
});

export default searchUserSlice.reducer;
