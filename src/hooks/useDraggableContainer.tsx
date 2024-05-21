import {
  AnimationControls,
  AnimationDefinition,
  useAnimation,
} from 'framer-motion';
import { useState, useEffect } from 'react';

const animate = (
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
  dataTrigger: unknown;
  defaultElementRef?: React.RefObject<HTMLElement>;
  activeElementRef?: React.RefObject<HTMLElement>;
  startAnimation?: AnimationDefinition;
  additionalTriggers: unknown[] | [];
}

function useDraggableContainer({
  containerRef,
  dataTrigger,
  defaultElementRef,
  activeElementRef,
  startAnimation,
  additionalTriggers,
}: UseDraggableContainerParams) {
  const [containerWidth, setContainerWidth] = useState(0);

  const control = useAnimation();

  // Set width of container
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(() => {
        return (containerRef.current as HTMLElement).scrollWidth;
      });

      if (startAnimation) {
        control.start(startAnimation);
      }
    }
  }, [dataTrigger, containerWidth]);

  // Jump to default
  useEffect(() => {
    if (defaultElementRef) {
      if (
        defaultElementRef.current &&
        !activeElementRef?.current &&
        containerWidth !== 0
      ) {
        animate(control, containerWidth, defaultElementRef);
      }
    }
  }, [containerWidth, ...additionalTriggers]);

  // Jump to active
  useEffect(() => {
    if (activeElementRef) {
      if (activeElementRef.current && containerWidth !== 0) {
        animate(control, containerWidth, activeElementRef);
      }
    }
  }, [activeElementRef?.current, containerWidth]);

  return { containerWidth, control };
}

export default useDraggableContainer;
