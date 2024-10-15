import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  AppBar,
  Badge,
  Box,
  IconButton,
  Input,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import { logout } from "helpers/auth.helper";
import { AuthContext } from "components/authContext/AuthContext";
import {
  APP_NAME,
  NAVBAR_MENU_ITEMS,
  NAVBAR_MENU_ITEMS_MOBILE,
} from "constants/common.constant";

import "./NavBar.css";

const Navbar = (props) => {
  const { setToken } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const {
    toggleDrawer,
    onSearch,
    firstName,
    profilePicture,
    onShowSearchResults,
    userId,
  } = props;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    setToken("");
    logout();
    handleMenuClose();
  };

  const navigateToProfile = () => {
    navigate(`profile?userId=${userId}`);
    handleMenuClose();
  };

  const navigateToHome = () => navigate("/");

  const menuId = "navbar-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navigateToProfile}>
        <IconButton size="large" aria-haspopup="true" color="inherit">
          <Avatar src={profilePicture} />
        </IconButton>
        <p className="navbar-menu-item">{NAVBAR_MENU_ITEMS.PROFILE}</p>
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <IconButton size="large" aria-haspopup="true" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p className="navbar-menu-item">{NAVBAR_MENU_ITEMS.LOGOUT}</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "navbar-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p className="navbar-menu-item-mobile">
          {NAVBAR_MENU_ITEMS_MOBILE.NOTIFICATIONS}
        </p>
      </MenuItem>
      <MenuItem onClick={navigateToProfile}>
        <IconButton size="large" aria-haspopup="true">
          <Avatar sx={{ width: 24, height: 24 }} src={profilePicture} />
        </IconButton>
        <p className="navbar-menu-item-mobile">{firstName}</p>
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <IconButton size="large" aria-haspopup="true">
          <LogoutIcon />
        </IconButton>
        <p className="navbar-menu-item-mobile">
          {NAVBAR_MENU_ITEMS_MOBILE.LOGOUT}
        </p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className="nav-bar-container" sx={{ flexGrow: 1 }} tabIndex={100}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={navigateToHome}
            className="cursor-pointer app-name"
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div className="search-wrapper">
            <div className="search-icon-wrapper">
              <SearchIcon />
            </div>
            <Input
              className="search-field"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={onSearch}
              onClick={onShowSearchResults}
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={1} color="error">
                <PersonIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={profilePicture} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
