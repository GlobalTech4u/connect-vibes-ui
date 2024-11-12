import React, { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CreatePost from "components/createPost/CreatePost";
import FriendsCard from "components/friendsCard/FriendsCard";
import PostContainerSkeleton from "skeletons/PostContainerSkeleton/PostContainerSkeleton";
import { getFullName } from "helpers/user.helper";
import { fetchNewsFeeds } from "reduxStore/slices/postSlice";
import { getFollowers, getFollowings } from "reduxStore/slices/usersSlice";
import { socket } from "utils/socket";

import "./Newsfeed.css";

const PostsContainer = lazy(() =>
  import("components/postsContainer/PostsContainer")
);

const Newsfeed = () => {
  const user = useSelector((state) => state?.auth?.user);
  const posts = useSelector((state) => state?.post?.newsFeed);
  const followers = useSelector((state) => state?.profile?.followers);
  const followings = useSelector((state) => state?.profile?.followings);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("post_added", ({ userId }) => {
      console.log(`post added by ${userId}`);
      getPosts(user?._id);
    });
  }, [socket, user]);

  const getPosts = async (userId) => {
    dispatch(fetchNewsFeeds({ userId: userId || user?._id }));
  };

  const getFollowersByUser = () => {
    const payload = {
      userId: user?._id,
    };
    dispatch(getFollowers(payload));
  };

  const getFollowingsByUser = () => {
    const payload = {
      userId: user?._id,
    };
    dispatch(getFollowings(payload));
  };

  useEffect(() => {
    if (user?._id) {
      getPosts();
      getFollowersByUser();
      getFollowingsByUser();
    }
  }, []);

  const name = getFullName(user?.firstName, user?.lastName);
  const profilePicturePath =
    user?.profilePictures?.length > 0
      ? user?.profilePictures[0]?.picture?.path
      : "";

  const followersId = followers?.map((follower) => follower?._id);

  return (
    <div className="news-feeds" data-testid="news-feeds">
      <div className="news-feeds-left-container">
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
          <Suspense fallback={<PostContainerSkeleton />}>
            <PostsContainer
              posts={posts}
              userId={user?._id}
              getPosts={getPosts}
            />
          </Suspense>
        </div>
      </div>
      <div className="news-feeds-right-container">
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
