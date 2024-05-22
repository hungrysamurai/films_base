import { AnimationControls, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const animateTransition = (
  control: AnimationControls,
  containerWidth: number,
  ref: React.RefObject<HTMLElement>,
): void => {
  const el = ref.current as HTMLElement;

  control.start({
    x: containerWidth / 2 - el.offsetLeft - el.scrollWidth / 2,
    transition: {
      stiffness: 50,
      type: 'spring',
    },
  });
};

interface UseDraggableContainerParams {
  containerRef: React.RefObject<HTMLElement>;
  dataTrigger: unknown | unknown[];
  defaultElementRef?: React.RefObject<HTMLElement>;
  activeElementRef?: React.RefObject<HTMLElement>;
  isGallery?: boolean;
  additionalTriggers?: unknown[] | [];
}

// //////////////MAYBE - SPLIT
function useDraggableContainer({
  containerRef,
  dataTrigger,
  defaultElementRef,
  activeElementRef,
  isGallery = false,
  additionalTriggers = [],
}: UseDraggableContainerParams) {
  const [containerWidth, setContainerWidth] = useState(0);
  const control = useAnimation();

  // Gallery states
  const [galleryRow, setGalleryRow] = useState<unknown[]>([]);
  const [totalElementsLoaded, setTotalElementsLoaded] = useState(0);
  const [galleryElementsIsLoading, setGalleryElementsIsLoading] =
    useState(true);

  // Set width of container
  useEffect(() => {
    if (containerRef.current && !isGallery) {
      setContainerWidth(() => {
        return (containerRef.current as HTMLElement).scrollWidth;
      });
    }
  }, [dataTrigger, containerWidth]);

  // Jump to default
  useEffect(() => {
    if (defaultElementRef && !isGallery) {
      if (
        defaultElementRef.current &&
        !activeElementRef?.current &&
        containerWidth !== 0
      ) {
        animateTransition(control, containerWidth, defaultElementRef);
      }
    }
  }, [activeElementRef?.current, containerWidth, ...additionalTriggers]);

  // Jump to active
  useEffect(() => {
    if (activeElementRef && !isGallery) {
      if (activeElementRef.current && containerWidth !== 0) {
        animateTransition(control, containerWidth, activeElementRef);
      }
    }
  }, [activeElementRef?.current, containerWidth]);

  // Gallery effects

  useEffect(() => {
    if (Array.isArray(dataTrigger) && isGallery) {
      setGalleryRow(() => dataTrigger);

      if (dataTrigger.length === 0) {
        setGalleryElementsIsLoading(false);
      }
    }
  }, [dataTrigger]);

  useEffect(() => {
    if (
      totalElementsLoaded === galleryRow.length &&
      containerRef.current &&
      isGallery
    ) {
      setContainerWidth(() => {
        return (containerRef.current as HTMLElement).scrollWidth;
      });

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
  }, [totalElementsLoaded, galleryRow, containerWidth]);

  return {
    containerWidth,
    control,
    totalElementsLoaded,
    galleryRow,
    setTotalElementsLoaded,
    galleryElementsIsLoading,
  };
}

export default useDraggableContainer;
