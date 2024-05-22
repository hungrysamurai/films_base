import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useDraggableContainer from '../../hooks/useDraggableContainer';

type ImageGalleryProp = {
  openModal: (data: string[], imageIndex: number) => void;
  imagesArray: string[];
};

const ImageGallery: React.FC<ImageGalleryProp> = ({
  openModal,
  imagesArray,
}) => {
  const [isDrag, setIsDrag] = useState(false);
  const galleryRowContainerRef = useRef<HTMLDivElement>(null);

  const {
    totalElementsLoaded,
    galleryRow,
    containerWidth,
    setTotalElementsLoaded,
    galleryElementsIsLoading,
    control,
  } = useDraggableContainer({
    containerRef: galleryRowContainerRef,
    dataTrigger: imagesArray,
    isGallery: true,
  });

  const openImage = (index: number) => {
    if (totalElementsLoaded === galleryRow.length) {
      openModal(galleryRow as string[], index);
    }
  };

  return (
    <div className="gallery-container">
      <motion.div
        ref={galleryRowContainerRef}
        drag="x"
        dragConstraints={{
          left: (containerWidth - containerWidth / galleryRow.length) * -1,
          right: 0,
        }}
        onDrag={() => setIsDrag(() => true)}
        onDragEnd={() => setIsDrag(() => false)}
        className="gallery-wrapper"
        animate={control}
        initial={{ opacity: 0 }}
      >
        {galleryRow.map((image, i) => {
          return (
            <div
              className="gallery-image-container"
              key={i}
              onClick={() => openImage(i)}
              style={{
                pointerEvents: isDrag
                  ? ('none' as React.CSSProperties['pointerEvents'])
                  : ('' as React.CSSProperties['pointerEvents']),
              }}
            >
              <img
                src={image as string}
                alt="img"
                onLoad={() => {
                  setTotalElementsLoaded((prev) => prev + 1);
                }}
              />
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: galleryElementsIsLoading ? 1 : 0,
        }}
        transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
        className="gallery-loading-container"
      ></motion.div>
    </div>
  );
};

export default ImageGallery;
