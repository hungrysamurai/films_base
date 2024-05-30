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

interface UseDraggableListParams {
  containerRef: React.RefObject<HTMLElement>;
  dataTrigger: unknown;
  defaultElementRef?: React.RefObject<HTMLElement>;
  activeElementRef?: React.RefObject<HTMLElement>;
  additionalTriggers?: unknown[] | [];
}

function useDraggableList({
  containerRef,
  dataTrigger,
  defaultElementRef,
  activeElementRef,
  additionalTriggers = [],
}: UseDraggableListParams) {
  const [containerWidth, setContainerWidth] = useState(0);
  const control = useAnimation();

  // Set width of container
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(() => {
        return (containerRef.current as HTMLElement).scrollWidth;
      });
    }
  }, [dataTrigger]);

  // Jump to default
  useEffect(() => {
    if (defaultElementRef) {
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
    if (activeElementRef?.current && containerWidth !== 0) {
      animateTransition(control, containerWidth, activeElementRef);
    }
  }, [activeElementRef?.current, containerWidth]);

  return {
    containerWidth,
    control,
  };
}

export default useDraggableList;
