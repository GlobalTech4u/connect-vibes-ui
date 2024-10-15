import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Divider, Tab, Tabs } from "@mui/material";

import AboutCard from "components/aboutCard/AboutCard";
import CreatePost from "components/createPost/CreatePost";
import FriendsCard from "components/friendsCard/FriendsCard";
import PostsContainer from "components/postsContainer/PostsContainer";
import ProfileDetailsCard from "components/profileDetailsCard/ProfileDetailsCard";
import { fetchPostsByUserId } from "services/post.service";
import { getFullName, getUser } from "helpers/user.helper";
import { PROFILE_TABS_MENU_ITEMS } from "constants/common.constant";
import { socket } from "utils/socket";
import {
  getUserById,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
} from "services/user.service";

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
  const [openedUser, setOpenedUser] = useState({});
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("posts");
  const [search] = useSearchParams();

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  useEffect(() => {
    const userId = search.get("userId");
    setOpenedUserId(userId);
  }, [search]);

  useEffect(() => {
    user?._id && openedUserId && setIsCurrentUser(user?._id === openedUserId);
    setCurrentTab("posts");
  }, [openedUserId, user?._id]);

  const getPosts = () => {
    const userId = search.get("userId");
    userId &&
      fetchPostsByUserId({ userId: userId })
        .then((res) => {
          const posts = res?.data?.posts;
          setPosts(posts);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    socket?.on("post_added", ({ userId }) => {
      console.log(`post added by ${userId}`);
      !isCurrentUser && userId === openedUserId && getPosts();
    });
  }, [socket]);

  const getCurrentUser = (userId) => {
    getUserById({ userId: userId })
      .then((res) => {
        if (res?.status === 200) {
          setOpenedUser(res?.data?.user);
        }
      })
      .catch((error) => setOpenedUser({}));
  };

  const getFollowersByUser = () => {
    const payload = {
      userId: openedUserId,
    };
    getFollowers(payload)
      .then((res) => setFollowers(res?.data?.followers || []))
      .catch((error) => setFollowers([]));
  };

  const getFollowingsByUser = () => {
    const payload = {
      userId: openedUserId,
    };
    getFollowings(payload)
      .then((res) => setFollowings(res?.data?.followings || []))
      .catch((error) => setFollowings([]));
  };

  useEffect(() => {
    if (openedUserId) {
      getPosts();
      getCurrentUser(openedUserId);
      getFollowersByUser();
      getFollowingsByUser();
    }
  }, [openedUserId]);

  const name = getFullName(openedUser?.firstName, openedUser?.lastName);

  const onFollow = () => {
    const payload = {
      userId: openedUser?._id,
    };

    followUser(user?._id, payload)
      .then((res) => {
        if (res?.status === 200) {
          getUserById({ userId: user?._id }).then((res) => {
            const currentUser = {
              ...res?.data?.user,
              token: user?.token,
            };
            setUser(currentUser);
            localStorage.setItem("user", JSON.stringify(currentUser));
          });
          getCurrentUser(openedUserId);
          getFollowersByUser();
          getFollowingsByUser();
        }
      })
      .catch((err) => console.log(err));
  };

  const onUnfollow = () => {
    const payload = {
      userId: openedUser?._id,
    };

    unfollowUser(user?._id, payload)
      .then((res) => {
        if (res?.status === 200) {
          getUserById({ userId: user?._id }).then((res) => {
            const currentUser = {
              ...res?.data?.user,
              token: user?.token,
            };
            setUser(currentUser);
            localStorage.setItem("user", JSON.stringify(currentUser));
          });
          getCurrentUser(openedUserId);
          getFollowersByUser();
          getFollowingsByUser();
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
                  : `${openedUser?.following?.length || 0} following`}
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
              user={isCurrentUser ? user : openedUser}
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
          user={isCurrentUser ? user : openedUser}
          isEditing={isEditing}
          isCurrentUser={isCurrentUser}
          onEdit={onEdit}
          setUser={setUser}
        />
      </TabPanel>
    </div>
  );
};

export default Profile;
