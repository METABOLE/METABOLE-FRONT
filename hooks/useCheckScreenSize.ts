import { BREAKPOINTS } from '@/types';
import { useEffect, useState } from 'react';

export const useMatchMedia = (breakpoint: BREAKPOINTS) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia(`(max-width: ${breakpoint}px)`).matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
};
