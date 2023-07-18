import { motion } from "framer-motion";

import CloseModalIcon from "./icons/CloseModalIcon";
import { useEffect } from "react";

const Modal = ({ children, mode, hideModal, modalState }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalState]);

  if (mode === "gallery") {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="modal-container"
      >
        {children}
      </motion.div>
    );
  }

  if (mode === "box") {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="modal-container"
      >
        <div className="modal-box-container">
          <button className="close-modal" onClick={hideModal}>
            <CloseModalIcon />
          </button>
          {children}
        </div>
      </motion.div>
    );
  }

  if (mode === "overlay") {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="modal-container"
      >
        <div className="modal-overlay-container">
          <button className="close-modal" onClick={hideModal}>
            <CloseModalIcon />
          </button>
          {children}
        </div>
      </motion.div>
    );
  }
};

export default Modal;
