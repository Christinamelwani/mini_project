import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "black",
    width: "50%",
    height: "70%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Modal"
    >
      <div className="text-white cursor-pointer" onClick={onRequestClose}>
        Close
      </div>
      {children}
    </Modal>
  );
};

export default ModalComponent;
