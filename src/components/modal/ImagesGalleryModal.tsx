import { ImagesGalleryModalState, ModalDirection } from '../../pages/MoviePage';

import { AnimationControls } from 'framer-motion';
import { motion } from 'framer-motion';
import { memo, useCallback } from 'react';

import NextButton from './icons/NextButton';
import PrevButton from './icons/PrevButton';

type ImagesGalleryModalProps = {
  hideModal: (target: HTMLDivElement) => void;
  changeModalImage: (direction: ModalDirection) => void;
  control: AnimationControls;
  modal: ImagesGalleryModalState;
};

const ImagesGalleryModal: React.FC<ImagesGalleryModalProps> = ({
  hideModal,
  changeModalImage,
  control,
  modal,
}) => {
  const handleHideModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      hideModal(e.target as HTMLDivElement);
    },
    [hideModal],
  );

  const handleChangeImage = useCallback(
    (direction: ModalDirection) => () => {
      changeModalImage(direction);
    },
    [changeModalImage],
  );
  return (
    <>
      <div className="modal-index-controls" onClick={handleHideModal}>
        <PrevButton onClick={handleChangeImage(ModalDirection.Prev)} />
        <NextButton onClick={handleChangeImage(ModalDirection.Next)} />
      </div>

      <motion.div
        className="modal-images-wrapper"
        animate={control}
        initial={{
          x: `-${modal.imageIndex * 100}%`,
        }}
        transition={{
          stiffness: 50,
          type: 'spring',
        }}
      >
        {modal.imagesArray}
      </motion.div>
    </>
  );
};

export default memo(ImagesGalleryModal);
