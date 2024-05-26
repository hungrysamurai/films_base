import { useCallback, useEffect, useRef } from 'react';

function useInfiniteScroll(
  currentPage: number,
  totalPages: number,
  increasePage: () => void,
  isError: boolean,
) {
  const currentPageRef = useRef(currentPage);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const debouncedIncreasePage = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      increasePage();
    }, 100);
  }, [increasePage]);

  const scrollHandler = useCallback(() => {
    if (currentPageRef.current < totalPages) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 300
      ) {
        debouncedIncreasePage();
      }
    }
  }, [totalPages, debouncedIncreasePage]);

  useEffect(() => {
    if (isError) {
      return;
    }

    if (totalPages > 1) {
      window.addEventListener('scroll', scrollHandler);
    }

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isError, totalPages, scrollHandler]);

  useEffect(() => {
    // Cleanup debounce timer on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
}

export default useInfiniteScroll;
