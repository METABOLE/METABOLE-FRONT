'use client';

import { useEffect } from 'react';
import { useTouchDevice } from './useTouchDevice';

const useWindowResizeReload = (delay = 100) => {
  if (useTouchDevice()) return;

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
