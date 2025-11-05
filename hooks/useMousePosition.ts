import { useEffect, useState, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (containerRef?: RefObject<HTMLElement | null>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    let cachedRect: DOMRect | null = null;

    const updateCachedRect = () => {
      if (containerRef?.current) {
        cachedRect = containerRef.current.getBoundingClientRect();
      }
    };

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      if (containerRef?.current && cachedRect) {
        setMousePosition({
          x: mouseEvent.clientX - cachedRect.left,
          y: mouseEvent.clientY - cachedRect.top,
        });
      } else {
        setMousePosition({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        });
      }
    };

    updateCachedRect();

    const element = containerRef?.current || window;
    element.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('resize', updateCachedRect);
    window.addEventListener('scroll', updateCachedRect);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCachedRect);
      window.removeEventListener('scroll', updateCachedRect);
    };
  }, [containerRef]);

  return mousePosition;
};
