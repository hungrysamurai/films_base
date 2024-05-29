import { ModalMode } from '../../types';

import { ReactElement, memo, useMemo } from 'react';
import { motion } from 'framer-motion';

import CloseModalIcon from './icons/CloseModalIcon';

type ModalProps = {
  children: ReactElement;
  mode: ModalMode;
  hideModal?: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, mode, hideModal }) => {
  const renderCloseButton = useMemo(
    () =>
      hideModal ? (
        <button className="close-modal" onClick={hideModal}>
          <CloseModalIcon />
        </button>
      ) : null,
    [hideModal],
  );

  const modalContent = useMemo(() => {
    switch (mode) {
      case ModalMode.Gallery:
        return children;

      case ModalMode.Box:
        return (
          <div className="modal-box-container">
            {renderCloseButton}
            {children}
          </div>
        );

      case ModalMode.Overlay:
        return (
          <div className="modal-overlay-container">
            {renderCloseButton}
            {children}
          </div>
        );

      default:
        return null;
    }
  }, [mode, children, renderCloseButton]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="modal-container"
    >
      {modalContent}
    </motion.div>
  );
};

export default memo(Modal);
