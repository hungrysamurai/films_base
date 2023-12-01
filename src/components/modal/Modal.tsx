import { ReactElement } from "react";

import { motion } from "framer-motion";

import CloseModalIcon from "./icons/CloseModalIcon";
import { ModalMode } from "../../types";

type ModalProps = {
  children: ReactElement;
  mode: ModalMode;
  hideModal?: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, mode, hideModal }) => {
  if (mode === ModalMode.Gallery) {
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

  if (mode === ModalMode.Box) {
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

  if (mode === ModalMode.Overlay) {
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
