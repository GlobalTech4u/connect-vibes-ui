import * as React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { REDUX_ACTION } from "constants/common.constant";
import { getFullName } from "helpers/user.helper";
import {
  deletePost,
  likePost,
  sharePost,
  unlikePost,
} from "reduxStore/slices/postSlice";

import "./PostCard.css";

const ITEM_HEIGHT = 48;

const options = ["Delete"];

const PostCard = (props) => {
  const { post, userId, getPosts } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClick = async (option) => {
    if (option === "Delete") {
      const payload = {
        userId: userId,
        postId: post?._id,
      };
      dispatch(deletePost(payload))
        .then((res) => {
          if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
            getPosts();
          }
        })
        .catch((error) => console.log(error));
    }

    handleClose();
  };

  const onLikePost = () => {
    const payload = {
      userId: userId,
      postId: post?._id,
    };
    dispatch(likePost(payload))
      .then((res) => {
        if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
          getPosts();
        }
      })
      .catch((error) => console.log(error));
  };

  const onUnlikePost = () => {
    const payload = {
      userId: userId,
      postId: post?._id,
    };
    unlikePost(payload)
      .then((res) => {
        if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
          getPosts();
        }
      })
      .catch((error) => console.log(error));
  };

  const onSharePost = () => {
    dispatch(sharePost(userId, post?._id)).then((res) => {
      if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
        getPosts();
      }
    });
  };

  const userName = getFullName(post.firstName, post.lastName);

  const isLiked =
    post?.likes?.filter((like) => like?.userId === userId)?.length > 0;

  return (
    <Card
      className="view-post-card"
      sx={{ width: "100%" }}
      key={`post-card-${post?._id}`}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="profile-picture"
            src={post?.profilePicture?.picture?.path}
          />
        }
        action={
          userId === post?.userId && (
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleSubMenuClick(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )
        }
        title={userName}
        subheader={moment(post?.updatedAt).format("YYYY/MM/DD kk:mm")}
      />

      <CardContent className="post-card-content">
        <span className="post-content-text">{post?.content}</span>
      </CardContent>
      <div className="post-card-attachments">
        {post?.attachments?.map((attachment) => {
          return (
            <CardMedia
              key={`post-card-media-${attachment?._id}`}
              component="img"
              image={attachment?.attachment?.path}
              alt="post-image"
            />
          );
        })}
      </div>
      <CardActions className="post-card-footer" disableSpacing>
        {isLiked ? (
          <FavoriteRoundedIcon
            className="cursor-pointer"
            onClick={onUnlikePost}
          />
        ) : (
          <FavoriteBorderRoundedIcon
            className="cursor-pointer"
            onClick={onLikePost}
          />
        )}
        <ShareIcon onClick={onSharePost} className="cursor-pointer" />
      </CardActions>
    </Card>
  );
};

export default PostCard;
