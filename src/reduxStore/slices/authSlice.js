import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URLS_CONSTANT } from "constants/url.constant";
import { getUser } from "helpers/user.helper";
import { axios } from "services/axios.service";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    return axios
      .post(URLS_CONSTANT.login, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          return { user: res?.data?.user };
        }
      })
      .catch((error) => {
        return rejectWithValue(error?.response?.data);
      });
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (payload) => {
    return axios
      .get(URLS_CONSTANT.user.replace("{userId}", payload?.userId))
      .then((res) => {
        if (res?.status === 200) {
          return res?.data?.user;
        }
      });
  }
);

export const getUserFollowers = createAsyncThunk(
  "auth/getUserFollowers",
  async (payload) => {
    return axios
      .get(URLS_CONSTANT.user_followers.replace("{userId}", payload?.userId))
      .then((res) => {
        if (res?.status === 200) {
          return res?.data?.followers;
        }
      });
  }
);

export const getUserFollowings = createAsyncThunk(
  "auth/getUserFollowings",
  async (payload) => {
    return axios
      .get(URLS_CONSTANT.user_followings.replace("{userId}", payload?.userId))
      .then((res) => {
        if (res?.status === 200) {
          return res?.data?.followings;
        }
      });
  }
);

const user = getUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || {},
    followers: [],
    followings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = {};
        state.error = action.payload.message;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserFollowers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followers = action.payload;
      })
      .addCase(getUserFollowers.rejected, (state, action) => {
        state.status = "failed";
        state.followers = [];
        state.error = action.error.message;
      })
      .addCase(getUserFollowings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserFollowings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followings = action.payload;
      })
      .addCase(getUserFollowings.rejected, (state, action) => {
        state.status = "failed";
        state.followings = [];
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
