import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import { Avatar, Button, Modal } from "@mui/material";
import { red } from "@mui/material/colors";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Textarea from "@mui/joy/Textarea";

import { socket } from "utils/socket";
import { createPost } from "services/post.service";
import {
  CREATE_POST_ATTACHMENTS_OPTIONS,
  FILE_TYPES,
  WRITE_POST_PLACEHOLDER,
} from "constants/common.constant";

import "./CreatePostModal.css";

const CreatePostModal = (props) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const {
    profilePicture,
    getPosts,
    showCreatePostModal,
    onHideCreatePostModal,
    followersId,
    userId,
    name,
  } = props;

  const onChangeContent = (event) => {
    setContent(event?.target?.value);
  };

  const onPostFileUpload = (attachments) => {
    if (attachments?.length > 0) {
      return setFiles(attachments);
    }
    if (files?.length > 0) {
      return setFiles(files);
    }

    return setFiles([]);
  };

  const onCreatePost = async () => {
    if (content || files?.length > 0) {
      const payload = {
        content: content,
        postAttachments: files,
      };

      createPost(userId, payload)
        .then((res) => {
          if (res?.status === 201) {
            getPosts();
            onHideCreatePostModal();
            socket?.emit("add_post", {
              userId: userId,
              followers: followersId,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Modal
      open={showCreatePostModal}
      onClose={onHideCreatePostModal}
      aria-labelledby="modal-create-post"
    >
      <div className="modal-container">
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">Create Post</h2>
            <HighlightOffRoundedIcon
              className="modal-close-icon cursor-pointer"
              onClick={onHideCreatePostModal}
            />
          </div>
          <div className="model-content">
            <div className="content-header-container">
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={profilePicture}
              />
              <span className="name">{name}</span>
            </div>
            <div className="write-post-container">
              <Textarea
                className="write-post"
                required
                minRows={2}
                maxRows={3}
                placeholder={WRITE_POST_PLACEHOLDER}
                size="md"
                name="content"
                onChange={onChangeContent}
                value={content}
              />
            </div>
            <div>
              <FileUploader
                multiple={true}
                handleChange={onPostFileUpload}
                name="postAttachments"
                types={FILE_TYPES}
              />
            </div>
            <div className="attachments-container">
              <div className="share-option">
                <PhotoLibraryIcon color="primary" />
                <span className="shareOptionText">
                  {CREATE_POST_ATTACHMENTS_OPTIONS.PHOTOS}
                </span>
              </div>
              <div className="share-option">
                <AddLocationAltIcon color="primary" />
                <span className="shareOptionText">
                  {CREATE_POST_ATTACHMENTS_OPTIONS.LOCATION}
                </span>
              </div>
              <div className="share-option">
                <SentimentVerySatisfiedIcon color="primary" />
                <span className="shareOptionText">
                  {CREATE_POST_ATTACHMENTS_OPTIONS.FEELINGS}
                </span>
              </div>
            </div>
            <div className="buttons-container">
              <Button
                className="primary-button"
                variant="contained"
                fullWidth
                onClick={onCreatePost}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
