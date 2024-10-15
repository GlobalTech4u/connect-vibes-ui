import { axios } from "services/axios.service";

import { URLS_CONSTANT } from "constants/url.constant";

const fetchPostsByUserId = async (payload) => {
  return axios.get(URLS_CONSTANT.posts.replace("{userId}", payload?.userId));
};

const likePost = async (payload) => {
  return axios.post(
    URLS_CONSTANT.likePost
      .replace("{userId}", payload?.userId)
      .replace("{postId}", payload?.postId),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

const unlikePost = async (payload) => {
  return axios.post(
    URLS_CONSTANT.unlikePost
      .replace("{userId}", payload?.userId)
      .replace("{postId}", payload?.postId),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

const fetchNewsFeeds = async (payload) => {
  return axios.get(
    URLS_CONSTANT.news_feeds.replace("{userId}", payload?.userId)
  );
};

const deletePost = async (payload) => {
  return axios.delete(
    URLS_CONSTANT.post
      .replace("{userId}", payload?.userId)
      .replace("{postId}", payload?.postId)
  );
};

const createPost = async (userId, payload) => {
  return axios.post(URLS_CONSTANT.posts.replace("{userId}", userId), payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const sharePost = async (userId, postId) => {
  return axios.post(
    URLS_CONSTANT.sharePost
      .replace("{userId}", userId)
      .replace("{postId}", postId),
    {}
  );
};

export {
  fetchPostsByUserId,
  createPost,
  sharePost,
  deletePost,
  fetchNewsFeeds,
  likePost,
  unlikePost,
};
