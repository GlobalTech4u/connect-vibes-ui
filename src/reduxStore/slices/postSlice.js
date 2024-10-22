import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URLS_CONSTANT } from "constants/url.constant";
import { axios } from "services/axios.service";

export const fetchPostsByUserId = createAsyncThunk(
  "post/fetchPostsByUserId",
  async (payload) => {
    return axios
      .get(URLS_CONSTANT.posts.replace("{userId}", payload?.userId))
      .then((res) => {
        if (res?.status === 200) {
          return res?.data?.posts;
        }
      });
  }
);

export const likePost = createAsyncThunk("post/likePost", async (payload) => {
  return axios.post(
    URLS_CONSTANT.likePost
      .replace("{userId}", payload?.userId)
      .replace("{postId}", payload?.postId),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
});

export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async (payload) => {
    return axios.post(
      URLS_CONSTANT.unlikePost
        .replace("{userId}", payload?.userId)
        .replace("{postId}", payload?.postId),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  }
);

export const fetchNewsFeeds = createAsyncThunk(
  "post/fetchNewsFeeds",
  async (payload) => {
    return axios
      .get(URLS_CONSTANT.news_feeds.replace("{userId}", payload?.userId))
      .then((res) => {
        if (res?.status === 200) {
          return res?.data?.posts;
        }
      });
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (payload) => {
    return axios.delete(
      URLS_CONSTANT.post
        .replace("{userId}", payload?.userId)
        .replace("{postId}", payload?.postId)
    );
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (payload) => {
    const { userId, ...reqPayload } = payload;
    return axios.post(
      URLS_CONSTANT.posts.replace("{userId}", userId),
      reqPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
);

export const sharePost = createAsyncThunk(
  "post/sharePost",
  async (userId, postId) => {
    return axios.post(
      URLS_CONSTANT.sharePost
        .replace("{userId}", userId)
        .replace("{postId}", postId),
      {}
    );
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    newsFeed: [],
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.posts = [];
        state.error = action.error.message;
      })
      .addCase(fetchNewsFeeds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsFeeds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newsFeed = action.payload;
      })
      .addCase(fetchNewsFeeds.rejected, (state, action) => {
        state.status = "failed";
        state.newsFeed = [];
        state.error = action.error.message;
      })
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unlikePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sharePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sharePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
