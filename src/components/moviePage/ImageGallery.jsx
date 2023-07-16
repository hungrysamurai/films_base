import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ImageGallery = ({ openModal, imagesArray }) => {
  const [galleryRow, setGalleryRow] = useState([]);
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0);
  const [galleryRowWidth, setGalleryRowWidth] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [loading, setLoading] = useState(true);
  const animationControl = useAnimation();

  const galleryRowContainerRef = useRef(null);

  useEffect(() => {
    setGalleryRow(() => imagesArray);

    if (imagesArray.length === 0) {
      setLoading(false);
    }
  }, [imagesArray]);

  useEffect(() => {
    if (totalImagesLoaded === galleryRow.length) {
      setGalleryRowWidth(() => {
        return galleryRowContainerRef.current.scrollWidth;
      });

      if (galleryRowWidth !== 0) {
        animationControl.start({
          opacity: 1,
          x:
            galleryRow.length > 4
              ? -Math.floor(galleryRowWidth / galleryRow.length / 2)
              : 0,
          transition: { duration: 1 },
        });

        setLoading(() => false);
      }
    }
  }, [totalImagesLoaded, galleryRow.length, animationControl, galleryRowWidth]);

  const openImage = (index) => {
    if (totalImagesLoaded === galleryRow.length) {
      openModal(galleryRow, index);
    }
  };

  return (
    <div className="gallery-container">
      <motion.div
        ref={galleryRowContainerRef}
        drag="x"
        dragConstraints={{
          left: (galleryRowWidth - galleryRowWidth / galleryRow.length) * -1,
          right: 0,
        }}
        onDrag={() => setIsDrag(() => true)}
        onDragEnd={() => setIsDrag(() => false)}
        className="gallery-wrapper"
        animate={animationControl}
        initial={{ opacity: 0 }}
      >
        {galleryRow.map((image, i) => {
          return (
            <div
              className="gallery-image-container"
              key={i}
              onClick={() => openImage(i)}
              style={{ pointerEvents: isDrag ? "none" : "" }}
            >
              <img
                src={image}
                alt="img"
                onLoad={() => {
                  setTotalImagesLoaded((prev) => prev + 1);
                }}
              />
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: loading ? 1 : 0,
        }}
        transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
        className="gallery-loading-container"
      ></motion.div>
    </div>
  );
};

export default ImageGallery;
