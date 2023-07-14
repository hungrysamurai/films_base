import { motion } from "framer-motion";

import CloseModalIcon from "./CloseModalIcon";

const Modal = ({ children, mode, hideModal }) => {

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

  if(mode === 'overlay'){
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
