import { useState,useEffect, useRef } from "react";
import { motion, useAnimation } from 'framer-motion';

const ImageGallery = ({openModal, imagesArray}) => {
  
  const [galleryRow, setGalleryRow] = useState([]);
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0)
  const [galleryRowWidth, setGalleryRowWidth] = useState(0);

  const animationControl = useAnimation();

  const galleryRowContainerRef = useRef(null);

  useEffect(() => {
    setGalleryRow(() => imagesArray);
  }, [imagesArray]);

  useEffect(() => {
    if(totalImagesLoaded === galleryRow.length){

      setGalleryRowWidth(() => {
      return galleryRowContainerRef.current.scrollWidth;
      });
      
      if (galleryRowWidth !== 0 && galleryRow.length > 4){
        animationControl.start({
            x: -Math.floor(galleryRowWidth / galleryRow.length),
            transition: {duration: 2}
          })
      }
    }
  },[totalImagesLoaded, galleryRow.length, animationControl,galleryRowWidth])

  const openImage = (index) => {
    if(totalImagesLoaded === galleryRow.length){
      openModal('images', galleryRow, index);
    }
  }

  return (
    <div className="gallery-container">

    <motion.div
      ref={galleryRowContainerRef}
      drag="x"
      dragConstraints={{
          left: (galleryRowWidth - (galleryRowWidth / galleryRow.length) * 4) * -1,
          right: 0,
        }}
      className="gallery-wrapper"
      animate={animationControl}
      >

        {galleryRow.map((image, i) => {
          return (
            <div 
            className="gallery-image-container"
            key={i}
            onClick={() => openImage(i)}
            >
              <img 
              src={image} 
              alt="img" 
              onLoad={() => {
                setTotalImagesLoaded((prev) => prev + 1);
              }} />
            </div>
          );
        })}

      </motion.div>

    </div>
  );
};

export default ImageGallery;
