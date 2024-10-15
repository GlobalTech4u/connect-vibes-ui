import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PersonIcon from "@mui/icons-material/Person";

import { SIDEBAR_MENU_ITEMS } from "constants/common.constant";

import "./Sidebar.css";

const Sidebar = (props) => {
  const { showDrawer, userId } = props;

  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");
  const navigateToProfile = () => navigate(`profile?userId=${userId}`);

  return (
    <Drawer
      className="side-bar"
      variant="persistent"
      open={showDrawer}
      sx={{
        width: showDrawer ? "140px" : "0",
      }}
    >
      <ul className="sidebar-list">
        <li className="listitem cursor-pointer" onClick={navigateToProfile}>
          <PersonIcon className="icon" />
          <span className="listitem-text">{SIDEBAR_MENU_ITEMS.PROFILE}</span>
        </li>
        <li className="listitem cursor-pointer" onClick={navigateToHome}>
          <RssFeedIcon className="icon" />
          <span className="listitem-text">{SIDEBAR_MENU_ITEMS.FEEDS}</span>
        </li>
      </ul>
    </Drawer>
  );
};

export default Sidebar;
