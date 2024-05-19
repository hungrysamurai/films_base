import { useEffect, useRef } from 'react';

function useInfiniteScroll(
  currentPage: number,
  totalPages: number,
  increasePage: () => void,
  isError: boolean,
) {
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const scrollHandler = () => {
    if (currentPageRef.current < totalPages) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        increasePage();
      }
    }
  };

  useEffect(() => {
    if (isError) {
      return;
    }

    if (totalPages > 1) {
      window.addEventListener('scroll', scrollHandler);
    }

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isError, totalPages]);
}

export default useInfiniteScroll;
