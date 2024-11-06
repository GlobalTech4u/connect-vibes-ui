import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Avatar, Button, Modal } from "@mui/material";
import { red } from "@mui/material/colors";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Textarea from "@mui/joy/Textarea";

import { socket } from "utils/socket";
import { createPost } from "reduxStore/slices/postSlice";
import { MESSAGES } from "constants/message.constant";
import {
  CREATE_POST_ATTACHMENTS_OPTIONS,
  FILE_TYPES,
  REDUX_ACTION,
  WRITE_POST_PLACEHOLDER,
} from "constants/common.constant";

import "./CreatePostModal.css";

const CreatePostModal = (props) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const {
    profilePicture,
    getPosts,
    showCreatePostModal,
    onHideCreatePostModal,
    followersId,
    userId,
    name,
  } = props;

  const dispatch = useDispatch();

  const onChangeContent = (event) => {
    setContent(event?.target?.value);
  };

  const onPostFileUpload = (attachments) => {
    const filesArray = Array.from(attachments);
    if (filesArray.length > 0) {
      setFiles([...files, ...filesArray]);
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const onCreatePost = async () => {
    if (content || files?.length > 0) {
      const payload = {
        content: content,
        postAttachments: files,
        userId: userId,
      };

      dispatch(createPost(payload)).then((res) => {
        if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
          toast.success(MESSAGES.POST_CREATED_SUCCESS);
          getPosts();
          onHideCreatePostModal();
          socket?.emit("add_post", {
            userId: userId,
            followers: followersId,
          });
        } else {
          toast.error(MESSAGES.POST_CREATED_ERROR);
        }
      });
    }
  };

  const onRemoveImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
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
            <div className="show-image-preview">
              {previews.map((preview, index) => (
                <div className="image-preview-container" key={index}>
                  <CancelRoundedIcon
                    className="remove-image-icon cursor-pointer"
                    onClick={() => onRemoveImage(index)}
                  />
                  <img
                    key={index}
                    src={preview}
                    height={200}
                    alt={`preview ${index}`}
                    className="image-preview"
                  />
                </div>
              ))}
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
