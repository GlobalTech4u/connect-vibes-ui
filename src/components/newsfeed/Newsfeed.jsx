import React, { useState, useEffect } from "react";

import CreatePost from "components/createPost/CreatePost";
import FriendsCard from "components/friendsCard/FriendsCard";
import PostsContainer from "components/postsContainer/PostsContainer";
import { fetchNewsFeeds } from "services/post.service";
import { getFullName, getUser } from "helpers/user.helper";
import { getFollowers, getFollowings } from "services/user.service";
import { socket } from "utils/socket";

import "./Newsfeed.css";

const Newsfeed = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    socket?.on("post_added", ({ userId }) => {
      console.log(`post added by ${userId}`);
      getPosts(user?._id);
    });
  }, [socket, user]);

  const getPosts = async (userId) => {
    fetchNewsFeeds({ userId: userId || user?._id })
      .then((res) => {
        const posts = res?.data?.posts;
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFollowersByUser = () => {
    const payload = {
      userId: user?._id,
    };
    getFollowers(payload)
      .then((res) => setFollowers(res?.data?.followers))
      .catch((error) => setFollowers([]));
  };

  const getFollowingsByUser = () => {
    const payload = {
      userId: user?._id,
    };
    getFollowings(payload)
      .then((res) => setFollowings(res?.data?.followings))
      .catch((error) => setFollowings([]));
  };

  useEffect(() => {
    if (user?._id) {
      getPosts();
      getFollowersByUser();
      getFollowingsByUser();
    }
  }, [user]);

  const name = getFullName(user?.firstName, user?.lastName);
  const profilePicturePath =
    user?.profilePictures?.length > 0
      ? user?.profilePictures[0]?.picture?.path
      : "";

  const followersId = followers?.map((follower) => follower?._id);

  return (
    <div className="news-feeds">
      <div className="left-container">
        <div className="newsfeed-create-post-container">
          <CreatePost
            getPosts={getPosts}
            profilePicture={profilePicturePath}
            userId={user?._id}
            name={name}
            followersId={followersId}
          />
        </div>
        <div className="newsfeed-view-posts-container">
          <PostsContainer
            posts={posts}
            userId={user?._id}
            getPosts={getPosts}
          />
        </div>
      </div>
      <div className="right-container">
        <FriendsCard
          title={"Followers"}
          users={followers}
          isSticky={followings?.length <= 0}
        />
        <FriendsCard title={"Following"} users={followings} isSticky={true} />
      </div>
    </div>
  );
};

export default Newsfeed;
