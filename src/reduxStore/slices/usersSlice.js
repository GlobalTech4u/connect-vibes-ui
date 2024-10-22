import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URLS_CONSTANT } from "constants/url.constant";
import { axios } from "services/axios.service";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload) => {
    return axios
      .post(URLS_CONSTANT.users, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res?.status === 201) {
          return res?.status?.user;
        }
      });
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload) => {
    return axios
      .put(URLS_CONSTANT.user.replace("{userId}", payload?._id), payload, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        if (res?.status === 201) {
          return res?.data?.user;
        }
      });
  }
);

// Async action to fetch user data by id
export const getUserById = createAsyncThunk(
  "search/getUserById",
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

export const followUser = createAsyncThunk(
  "users/followUser",
  async (payload) => {
    const reqPayload = {
      userId: payload?.openedUserId,
    };

    return axios.put(
      URLS_CONSTANT.user_follow.replace("{userId}", payload?.userId),
      reqPayload,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (payload) => {
    const reqPayload = {
      userId: payload?.openedUserId,
    };

    return axios.put(
      URLS_CONSTANT.user_unfollow.replace("{userId}", payload?.userId),
      reqPayload,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  }
);

export const getFollowers = createAsyncThunk(
  "users/getFollowers",
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

export const getFollowings = createAsyncThunk(
  "users/getFollowings",
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

const usersSlice = createSlice({
  name: "profile",
  initialState: {
    user: {},
    followings: [],
    followers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = {};
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = {};
        state.error = action.error.message;
      })
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getFollowers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.status = "failed";
        state.followers = [];
        state.error = action.error.message;
      })
      .addCase(getFollowings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followings = action.payload;
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.status = "failed";
        state.followings = [];
        state.error = action.error.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.user = {};
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
