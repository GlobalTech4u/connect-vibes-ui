import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "components/navBar/NavBar";
import Sidebar from "components/sidebar/Sidebar";
import SearchUserModal from "components/searchUserModal/SearchUserModal";
import { AuthContext } from "components/authContext/AuthContext";
import useDebounce from "hooks/useDebounce";
import { getUser } from "helpers/user.helper";
import { getUsers } from "services/user.service";

import "./Home.css";

const Home = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const [showDrawer, setShowDrawer] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  const onShowSearchResults = () => setShowSearchResults(true);
  const onHideSearchResults = () => setShowSearchResults(false);

  useEffect(() => {
    debouncedSearchQuery
      ? getUsers({ searchQuery: debouncedSearchQuery })
          .then((res) => {
            if (res?.status === 200) {
              setUsers(res?.data?.users);
              onShowSearchResults();
            }
          })
          .catch((error) => {
            setUsers([]);
            onHideSearchResults();
          })
      : onHideSearchResults();
  }, [debouncedSearchQuery]);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const onSearch = (event) => {
    setSearchQuery(event?.target?.value || "");
  };

  if (loading) {
    return null;
  }

  const profilePicturePath =
    user?.profilePictures?.length > 0
      ? user?.profilePictures[0]?.picture?.path
      : "";

  return (
    <div className="home-container">
      <Navbar
        toggleDrawer={toggleDrawer}
        onSearch={onSearch}
        firstName={user?.firstName}
        profilePicture={profilePicturePath}
        onShowSearchResults={onShowSearchResults}
        userId={user?._id}
      />
      <div className="home-body-container">
        <Sidebar showDrawer={showDrawer} userId={user?._id} />
        <div
          className="home-proteced-routes"
          style={{ flex: showDrawer ? "0 1 calc(100% - 140px)" : "0 1 100%" }}
        >
          <Outlet />
        </div>
        {showSearchResults && (
          <SearchUserModal
            users={users}
            showSearchResults={showSearchResults}
            onHideSearchResults={onHideSearchResults}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
