// components/FallingCrosses.tsx
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useRef } from 'react';
import clsx from 'clsx';
import { FallingCrossesProps } from '../types/crosses.types';
import { useFallingCrosses } from '../hooks/useFallingCrosses';
import { DEFAULT_CROSS_COLORS } from '../utils/crosses.utils';

const FallingCrosses = ({
  className,
  footerSelector = 'footer',
  footerOffset = 0,
  crossColors = DEFAULT_CROSS_COLORS,
}: FallingCrossesProps) => {
  const isTouchDevice = useTouchDevice();

  // Ne pas rendre le composant sur les appareils tactiles
  if (isTouchDevice) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Utiliser notre hook personnalisé pour toute la logique
  useFallingCrosses(canvasRef, footerSelector, footerOffset, crossColors);

  return (
    <div ref={containerRef} className={clsx('pointer-events-none fixed inset-0', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default FallingCrosses;
