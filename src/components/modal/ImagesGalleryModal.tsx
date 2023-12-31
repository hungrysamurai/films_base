import { AnimationControls } from "framer-motion";
import { ImagesGalleryModalState, ModalDirection } from "../../pages/MoviePage";

import { motion } from "framer-motion";

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
  return (
    <>
      <div
        className="modal-index-controls"
        onClick={(e) => hideModal(e.target as HTMLDivElement)}
      >
        <div
          className="prev-btn"
          onClick={() => {
            changeModalImage(ModalDirection.Prev);
          }}
        >
          <svg
            width="30"
            height="36"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-8.74228e-07 18L30 0.679488L30 35.3205L-8.74228e-07 18Z"
              fill="var(--primary-color)"
            />
          </svg>
        </div>
        <div
          className="next-btn"
          onClick={() => {
            changeModalImage(ModalDirection.Next);
          }}
        >
          <svg
            width="30"
            height="36"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 18L4.45043e-07 35.3205L3.19526e-08 0.679491L30 18Z"
              fill="var(--primary-color)"
            />
          </svg>
        </div>
      </div>

      <motion.div
        className="modal-images-wrapper"
        animate={control}
        initial={{
          x: `-${modal.imageIndex * 100}%`,
        }}
        transition={{
          stiffness: 50,
          type: "spring",
        }}
      >
        {modal.imagesArray}
      </motion.div>
    </>
  );
};

export default ImagesGalleryModal;
