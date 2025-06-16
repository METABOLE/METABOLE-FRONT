import useWindowResize from '@/hooks/useReloadResize';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useFallingCrosses } from '../../hooks/useFallingCrosses';
import { FallingCrossesProps } from '../../types/crosses.types';
import { DEFAULT_CROSS_COLORS } from '../../utils/crosses.utils';

const FallingCrosses = ({ className, crossColors = DEFAULT_CROSS_COLORS }: FallingCrossesProps) => {
  const isTouchDevice = useTouchDevice();
  const [key, setKey] = useState(0);

  if (isTouchDevice) return null;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useWindowResize(() => {
    setKey((prevKey) => prevKey + 1);
  });

  useFallingCrosses(canvasRef, crossColors);

  return (
    <div key={key} className={clsx('pointer-events-none fixed inset-0', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default FallingCrosses;
