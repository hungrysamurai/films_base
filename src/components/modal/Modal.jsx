import { motion } from "framer-motion";

const Modal = ({ children }) => {
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
};

export default Modal;
