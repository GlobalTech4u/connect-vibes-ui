import { useState } from "react";

import { Card, CardActions, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import Textarea from "@mui/joy/Textarea";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import CreatePostModal from "components/createPost/createPostModal/CreatePostModal";
import {
  CREATE_POST_ATTACHMENTS_OPTIONS,
  WRITE_POST_PLACEHOLDER,
} from "constants/common.constant";

import "./CreatePost.css";

const CreatePost = (props) => {
  const { getPosts, profilePicture, userId, name, followersId } = props;
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const onShowCreatePostModal = () => setShowCreatePostModal(true);
  const onHideCreatePostModal = () => setShowCreatePostModal(false);

  return (
    <Card className="create-post-container">
      <div className="post-editor-container">
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={profilePicture}
        />
        <Textarea
          className="post-editor cursor-pointer"
          minRows={2}
          maxRows={3}
          placeholder={WRITE_POST_PLACEHOLDER}
          size="md"
          onClick={onShowCreatePostModal}
        />
      </div>
      <CardActions className="attachments-container">
        <div
          className="share-option cursor-pointer"
          onClick={onShowCreatePostModal}
        >
          <PhotoLibraryIcon color="primary" />
          <span className="shareOptionText">
            {CREATE_POST_ATTACHMENTS_OPTIONS.PHOTOS}
          </span>
        </div>
        <div
          className="share-option cursor-pointer"
          onClick={onShowCreatePostModal}
        >
          <AddLocationAltIcon color="primary" />
          <span className="shareOptionText">
            {CREATE_POST_ATTACHMENTS_OPTIONS.LOCATION}
          </span>
        </div>
        <div
          className="share-option cursor-pointer"
          onClick={onShowCreatePostModal}
        >
          <SentimentVerySatisfiedIcon color="primary" />
          <span className="shareOptionText">
            {CREATE_POST_ATTACHMENTS_OPTIONS.FEELINGS}
          </span>
        </div>
        {showCreatePostModal && (
          <CreatePostModal
            profilePicture={profilePicture}
            getPosts={getPosts}
            showCreatePostModal={showCreatePostModal}
            onHideCreatePostModal={onHideCreatePostModal}
            followersId={followersId}
            userId={userId}
            name={name}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default CreatePost;
