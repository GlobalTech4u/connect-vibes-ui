import { Button, Modal } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

import LABELS from "constants/label.constant";

import "./DeletePostModal.css";

const DeletePostModal = (props) => {
  const { showDeletePostModal, onHideDeletePostModal, handleSubMenuClick } =
    props;

  const onDeletePost = () => {
    handleSubMenuClick("Delete");
  };

  return (
    <Modal
      open={showDeletePostModal}
      onClose={onHideDeletePostModal}
      aria-labelledby="modal-create-post"
    >
      <div className="modal-container">
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">Delete Post</h2>
            <HighlightOffRoundedIcon
              className="modal-close-icon cursor-pointer"
              onClick={onHideDeletePostModal}
            />
          </div>
          <div className="model-content">
            <span className="delete-post-modal-text">{LABELS.DELETE_POST}</span>
            <div className="delete-post-modal-actions">
              <Button variant="contained" fullWidth onClick={onDeletePost}>
                Delete
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onHideDeletePostModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
