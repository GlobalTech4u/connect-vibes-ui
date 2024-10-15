import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";

import "./AboutCard.css";

const AboutCard = (props) => {
  const { user, isSticky } = props;

  if (
    !user?.aboutMe &&
    !user?.jobTitle &&
    !user?.relationshipStatus &&
    !user?.city &&
    !user?.country
  ) {
    return;
  }

  return (
    <Card
      className={`about-card ${isSticky ? "left-container-sticky" : ""}`}
      key={`about-card-${user?._id}`}
    >
      <CardHeader className="card-header" title={`Intro`} />
      <CardContent className="about-card-content">
        <div className="aboutme">
          <span className="about-card-text">{user?.aboutMe}</span>
        </div>
        <Divider />
        <div className="about-contents">
          {user?.jobTitle && (
            <div className="about-content">
              <WorkOutlineRoundedIcon />
              <span className="about-card-text">{user?.jobTitle}</span>
            </div>
          )}
          {user?.relationshipStatus && (
            <div className="about-content">
              <FavoriteBorderRoundedIcon />
              <span className="about-card-text">
                {user?.relationshipStatus}
              </span>
            </div>
          )}
          {user?.city && (
            <div className="about-content">
              <LocationCityRoundedIcon />
              <span className="about-card-text">{user?.city}</span>
            </div>
          )}
          {user?.country && (
            <div className="about-content">
              <OutlinedFlagRoundedIcon />
              <span className="about-card-text">{user?.country}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
