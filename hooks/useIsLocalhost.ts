import { useState, useEffect } from 'react';

const useIsLocalhost = () => {
  const [isLocalhost, setIsLocalhost] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { hostname } = window.location;
      const isLocal =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.includes('.local') ||
        hostname.includes('.test');

      setIsLocalhost(isLocal);
    }
  }, []);

  return isLocalhost;
};

export default useIsLocalhost;
