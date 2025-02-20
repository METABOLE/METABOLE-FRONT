import { useEffect, useState, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (containerRef?: RefObject<HTMLElement | null>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: mouseEvent.clientX - rect.left,
          y: mouseEvent.clientY - rect.top,
        });
      } else {
        setMousePosition({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        });
      }
    };

    const element = containerRef?.current || window;
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef]);

  return mousePosition;
};
