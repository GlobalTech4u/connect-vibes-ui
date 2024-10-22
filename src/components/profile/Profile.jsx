import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Divider, Tab, Tabs } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import AboutCard from "components/aboutCard/AboutCard";
import CreatePost from "components/createPost/CreatePost";
import FriendsCard from "components/friendsCard/FriendsCard";
import PostsContainer from "components/postsContainer/PostsContainer";
import ProfileDetailsCard from "components/profileDetailsCard/ProfileDetailsCard";
import { getFullName } from "helpers/user.helper";
import { socket } from "utils/socket";
import { getCurrentUser } from "reduxStore/slices/authSlice";
import { fetchPostsByUserId } from "reduxStore/slices/postSlice";
import {
  getUserById,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
} from "reduxStore/slices/usersSlice";
import {
  PROFILE_TABS_MENU_ITEMS,
  REDUX_ACTION,
} from "constants/common.constant";

import "./Profile.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [openedUserId, setOpenedUserId] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("posts");
  const openedUser = useSelector((state) => state?.profile?.user);
  const followings = useSelector((state) => state?.profile?.followings);
  const followers = useSelector((state) => state?.profile?.followers);
  const user = useSelector((state) => state?.auth?.user);
  const posts = useSelector((state) => state?.post?.posts);
  const [search] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = search.get("userId");
    setOpenedUserId(userId);
  }, [search]);

  useEffect(() => {
    if (user?._id && openedUserId) {
      setIsCurrentUser(user?._id === openedUserId);
    }
    setCurrentTab("posts");
  }, [openedUserId, user?._id]);

  const getPosts = () => {
    const userId = search.get("userId");
    userId && dispatch(fetchPostsByUserId({ userId: userId }));
  };

  useEffect(() => {
    socket?.on("post_added", ({ userId }) => {
      console.log(`post added by ${userId}`);
      !isCurrentUser && userId === openedUserId && getPosts();
    });
  }, [socket]);

  const getProfileUser = () => {
    dispatch(getUserById({ userId: openedUserId }));
  };

  const getUser = () => {
    dispatch(getCurrentUser({ userId: user?._id }));
  };

  const getFollowersByUser = () => {
    const payload = {
      userId: openedUserId,
    };
    dispatch(getFollowers(payload));
  };

  const getFollowingsByUser = () => {
    const payload = {
      userId: openedUserId,
    };
    dispatch(getFollowings(payload));
  };

  useEffect(() => {
    if (openedUserId) {
      getPosts();
      getProfileUser();
      getFollowersByUser();
      getFollowingsByUser();
    }
  }, [openedUserId]);

  const name = getFullName(openedUser?.firstName, openedUser?.lastName);

  const onFollow = () => {
    const payload = {
      openedUserId: openedUser?._id,
      userId: user?._id,
    };

    dispatch(followUser(payload))
      .then((res) => {
        if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
          getProfileUser();
          getFollowersByUser();
          getUser();
        }
      })
      .catch((err) => console.log(err));
  };

  const onUnfollow = () => {
    const payload = {
      openedUserId: openedUser?._id,
      userId: user?._id,
    };

    dispatch(unfollowUser(payload))
      .then((res) => {
        if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
          getProfileUser();
          getFollowersByUser();
          getUser();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleTabChange = (event, newValue) => {
    setIsEditing(false);
    setCurrentTab(newValue);
  };

  const onEdit = () => setIsEditing(!isEditing);

  const onEditProfile = () => {
    setCurrentTab("about");
    setIsEditing(true);
  };

  const isFollowing = user?.followings?.some(
    (followingUser) => followingUser?.followerId === openedUser?._id
  );

  const profilePicturePath =
    openedUser?.profilePictures?.length > 0
      ? openedUser?.profilePictures[0]?.picture?.path
      : "";

  const followersId = followers?.map((follower) => follower?._id);

  if (!user?._id || !openedUser?._id) {
    return;
  }

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture-wrapper">
            <img
              className="profile-picture"
              src={profilePicturePath}
              alt="user profile"
            />
          </div>
          <div className="profile-content">
            <div className="profile-details">
              {openedUser?.firstName && (
                <span className="profile-details-content">
                  {openedUser?.firstName}
                </span>
              )}
              {openedUser?.lastName && (
                <span className="profile-details-content">
                  {openedUser?.lastName}
                </span>
              )}
            </div>
            <div className="profile-details">
              <span className="profile-details-content">
                {openedUser?.followers?.length === 1
                  ? "1 follower"
                  : `${openedUser?.followers?.length || 0} followers`}
              </span>
              <span className="profile-details-content">
                {openedUser?.followings?.length === 1
                  ? "1 following"
                  : `${openedUser?.followings?.length || 0} following`}
              </span>
            </div>
            {!isCurrentUser && (
              <div className="profile-actions">
                {isFollowing ? (
                  <Button
                    className="profile-action-button"
                    onClick={onUnfollow}
                  >
                    Following
                  </Button>
                ) : (
                  <Button className="profile-action-button" onClick={onFollow}>
                    Follow
                  </Button>
                )}
                <Button className="profile-action-button">Block</Button>
              </div>
            )}
          </div>
          {isCurrentUser && (
            <div className="profile-owner-actions">
              <Button
                className="profile-owner-action"
                onClick={onEditProfile}
                variant="contained"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
        <div className="divider-wrapper">
          <Divider />
        </div>
        <Tabs
          value={currentTab}
          aria-label="tabs"
          indicatorColor={"primary"}
          onChange={handleTabChange}
        >
          <Tab label={PROFILE_TABS_MENU_ITEMS.POSTS} value="posts" />
          <Tab label={PROFILE_TABS_MENU_ITEMS.ABOUT} value="about" />
        </Tabs>
      </div>
      <TabPanel
        className={"profile-tab-panel"}
        value={currentTab}
        index={"posts"}
      >
        <div className="profile-posts-container">
          <div className="profile-left-container">
            <AboutCard
              user={openedUser}
              isSticky={followers?.length <= 0 && followings?.length <= 0}
            />
            <FriendsCard
              title={"Followers"}
              users={followers}
              isSticky={followings?.length <= 0}
            />
            <FriendsCard
              title={"Following"}
              users={followings}
              isSticky={true}
            />
          </div>
          <div className="profile-right-container">
            <CreatePost
              getPosts={getPosts}
              profilePicture={profilePicturePath}
              userId={user?._id}
              followersId={followersId}
              name={name}
            />
            {posts?.length > 0 && (
              <PostsContainer
                posts={posts}
                userId={user?._id}
                getPosts={getPosts}
              />
            )}
          </div>
        </div>
      </TabPanel>
      <TabPanel
        className={"profile-tab-panel"}
        value={currentTab}
        index={"about"}
        style={{ width: "100%" }}
      >
        <ProfileDetailsCard
          user={openedUser}
          isEditing={isEditing}
          isCurrentUser={isCurrentUser}
          onEdit={onEdit}
          getProfileUser={getProfileUser}
        />
      </TabPanel>
    </div>
  );
};

export default Profile;
