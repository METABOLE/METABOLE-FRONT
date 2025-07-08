import { useState, useEffect } from 'react';

export const useEnvironment = () => {
  const [isProd, setIsProd] = useState(true);
  const [environment, setEnvironment] = useState('production');

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '192.168.1.47';

    setIsProd(!isLocalhost);
    setEnvironment(isLocalhost ? 'development' : 'production');
  }, []);

  return {
    isProd,
    environment,
  };
};
