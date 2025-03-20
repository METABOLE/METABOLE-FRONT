'use client';

import { useEffect } from 'react';

const useWindowResizeReload = (delay = 100) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        window.location.reload();
      }, delay);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay]);
};

export default useWindowResizeReload;
