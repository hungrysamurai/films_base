import { useEffect, useState } from 'react';

function useListenWindowWidth(): 'desktop' | 'mobile' | undefined {
  const [currentWidth, setCurrentWidth] = useState<
    'desktop' | 'mobile' | undefined
  >(() => getCurrentWindowWidth());

  function getCurrentWindowWidth(e?: Event) {
    if (!e) {
      return window.innerWidth <= 768 ? 'mobile' : 'desktop';
    } else {
      setCurrentWidth(() => {
        return (e.target as Window).innerWidth <= 768 ? 'mobile' : 'desktop';
      });
    }
  }

  useEffect(() => {
    window.addEventListener('resize', getCurrentWindowWidth);

    return () => {
      document.removeEventListener('resize', getCurrentWindowWidth);
    };
  }, []);

  return currentWidth;
}

export default useListenWindowWidth;
