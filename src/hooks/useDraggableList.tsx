import { AnimationControls, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const animateTransition = (
  control: AnimationControls,
  container: HTMLElement,
  element: HTMLElement,
) => {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const elementLeft = elementRect.left - containerRect.left;

  const x = container.clientWidth / 2 - elementLeft - elementRect.width / 2;

  control.start({
    x,
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
        containerRef.current
      ) {
        animateTransition(
          control,
          containerRef.current,
          defaultElementRef.current,
        );
      }
    }
  }, [activeElementRef?.current, containerWidth, ...additionalTriggers]);

  // Jump to active
  useEffect(() => {
    if (activeElementRef?.current && containerRef.current) {
      animateTransition(
        control,
        containerRef.current,
        activeElementRef.current,
      );
    }
  }, [activeElementRef?.current, containerWidth]);

  return {
    containerWidth,
    control,
  };
}

export default useDraggableList;
