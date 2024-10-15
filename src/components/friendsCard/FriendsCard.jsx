import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardContent, Avatar } from "@mui/material";

import { getFullName } from "helpers/user.helper";

import "./FriendsCard.css";

const FriendsCard = (props) => {
  const { title, users, isSticky } = props;
  const navigate = useNavigate();

  if (!users?.length) {
    return;
  }

  return (
    <Card
      className={`friends-card ${isSticky ? "left-container-sticky" : ""}`}
      sx={{ width: "100%" }}
      key={`friends-card`}
    >
      <CardHeader className="card-header" title={title} />
      <CardContent className="friends-card-content">
        {users?.map((user) => {
          const name = getFullName(user?.firstName, user?.lastName);

          const navigateToUser = () => navigate(`/profile?userId=${user?._id}`);

          return (
            <div className="friend-container" key={`friend-${user?._id}`}>
              <Avatar
                aria-label="recipe"
                src={user?.profilePicture?.picture?.path}
                className="cursor-pointer"
                onClick={navigateToUser}
              />
              <span
                className="cursor-pointer friend-name"
                onClick={navigateToUser}
              >
                {name}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default FriendsCard;
