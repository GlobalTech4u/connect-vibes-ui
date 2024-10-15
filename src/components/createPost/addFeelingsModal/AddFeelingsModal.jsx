import { Modal } from "@mui/material";

import "./AddFeelingsModal.css";

const AddFeelingsModal = () => {
  return (
    <Modal open={true} onClose={() => {}} aria-labelledby="modal-add-feelings">
      <div className="modal-container">
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">How are you feeling?</h2>
          </div>
          <div className="model-content"></div>
        </div>
      </div>
    </Modal>
  );
};

export default AddFeelingsModal;
