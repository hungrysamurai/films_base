import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UseDraggableGalleryParams {
  containerRef: React.RefObject<HTMLElement>;
  elementsArray: unknown[];
}

function useDraggableGallery({
  containerRef,
  elementsArray,
}: UseDraggableGalleryParams) {
  const [containerWidth, setContainerWidth] = useState(0);
  const control = useAnimation();

  const [galleryRow, setGalleryRow] = useState<unknown[]>([]);
  const [totalElementsLoaded, setTotalElementsLoaded] = useState(0);
  const [galleryElementsIsLoading, setGalleryElementsIsLoading] =
    useState(true);

  useEffect(() => {
    if (Array.isArray(elementsArray)) {
      setGalleryRow(() => elementsArray);

      if (elementsArray.length === 0) {
        setGalleryElementsIsLoading(false);
      } else {
        // default states when elementsArray changes
        setTotalElementsLoaded(() => 0);
        setGalleryElementsIsLoading(() => true);

        control.start({
          opacity: 0,
          x: 0,
        });
      }
    }
  }, [elementsArray]);

  // Set width of container
  useEffect(() => {
    if (containerRef.current && galleryRow.length !== 0) {
      setContainerWidth(() => {
        return (containerRef.current as HTMLElement).scrollWidth;
      });
    }
  }, [galleryRow]);

  useEffect(() => {
    // Reveal gallery if all images are loaded
    if (totalElementsLoaded === galleryRow.length) {
      if (containerWidth !== 0) {
        control.start({
          opacity: 1,
          x:
            galleryRow.length > 4
              ? -Math.floor(containerWidth / galleryRow.length / 2)
              : 0,
          transition: { duration: 1 },
        });

        setGalleryElementsIsLoading(false);
      }
    }
  }, [containerWidth, totalElementsLoaded]);

  return {
    containerWidth,
    control,
    galleryRow,
    totalElementsLoaded,
    setTotalElementsLoaded,
    galleryElementsIsLoading,
  };
}

export default useDraggableGallery;
