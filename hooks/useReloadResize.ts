import { useEffect } from 'react';
import { useTouchDevice } from './useTouchDevice';

const useWindowResize = (callback: () => void, delay = 100, skipOnTouchDevices = true) => {
  const isTouchDevice = useTouchDevice();

  if (skipOnTouchDevices && isTouchDevice) return;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        callback();
      }, delay);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [callback, delay]);
};

export default useWindowResize;
