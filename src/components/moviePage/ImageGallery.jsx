import { useGlobalContext } from "../../contexts/GlobalContext";
import { useState,useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { motion, useAnimation } from 'framer-motion';

const ImageGallery = () => {
  const { baseName } = useGlobalContext();

  const tempImages = useMemo(() => {
    return [
    `${baseName}assets/images/gallery/1.jpg`,
    `${baseName}assets/images/gallery/2.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
    `${baseName}assets/images/gallery/4.jpg`,
    `${baseName}assets/images/gallery/5.jpg`,
    `${baseName}assets/images/gallery/6.jpg`,
    `${baseName}assets/images/gallery/7.jpg`,
    `${baseName}assets/images/gallery/1.jpg`,
    `${baseName}assets/images/gallery/2.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
  ]},[]);


  const [galleryRow, setGalleryRow] = useState([]);
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0)
  const [galleryRowWidth, setGalleryRowWidth] = useState(0);

  const control = useAnimation();

  const galleryRowContainerRef = useRef(null);
  const firstGalleryEl = useRef(null);

  useEffect(() => {
    setGalleryRow(() => tempImages);
  }, [tempImages]);

  useEffect(() => {
    if(totalImagesLoaded === galleryRow.length){
      setGalleryRowWidth(() => {
      return galleryRowContainerRef.current.scrollWidth;
      });
    }
  },[totalImagesLoaded, galleryRow.length])

  useLayoutEffect(() => {

  if (firstGalleryEl.current) {
    console.log(galleryRowWidth / 2);
    control.start({
      x: 0,
    });
  }
}, [control,galleryRowWidth]);

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
      animate={control}
      >

        {galleryRow.map((image, i) => {
          return (
            <div className="gallery-image-container"
            key={i}
            ref={i === 0 ? firstGalleryEl : null}
            >
              <img src={image} alt="img" onLoad={() => {
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
