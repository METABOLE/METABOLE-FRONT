import { useEffect, useState } from 'react';

export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkTouch = (): boolean => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    setIsTouchDevice(checkTouch());
  }, []);

  return isTouchDevice;
};

export default useTouchDevice;
