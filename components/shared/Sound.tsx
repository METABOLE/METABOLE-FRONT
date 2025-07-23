import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useAudio } from '@/hooks/useAudio';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';
import Wave, { WaveHandles } from '../ui/Wave';
import { COLORS } from '@/types';
import { useTouchDevice } from '@/hooks/useTouchDevice';

const Sound = forwardRef<HTMLDivElement, { className?: string; isDark?: boolean }>(
  ({ className, isDark }, ref) => {
    const animatedWaveRef = useRef<WaveHandles>(null);
    const { isSoundOn, toggleSound, initializeAudio } = useAudio();
    const isTouchDevice = useTouchDevice();

    useEffect(() => {
      if (isSoundOn) {
        animatedWaveRef.current?.play();
      } else {
        animatedWaveRef.current?.pause();
      }
    }, [isSoundOn]);

    useEffect(() => {
      const handleFirstPageClick = () => {
        if (isTouchDevice) return;

        initializeAudio();
        document.removeEventListener('click', handleFirstPageClick);
      };

      document.addEventListener('click', handleFirstPageClick);

      return () => {
        document.removeEventListener('click', handleFirstPageClick);
      };
    }, [initializeAudio, isTouchDevice]);

    return (
      <div
        ref={ref}
        className={clsx(
          'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full',
          isDark ? 'bg-blue' : 'bg-menu',
          className,
        )}
        onClick={toggleSound}
        onMouseMove={(e) => useMagnet(e, 0.8)}
        onMouseOut={useResetMagnet}
      >
        <div
          className="flex h-full w-full items-center justify-center p-2.5"
          onMouseMove={(e) => useMagnet(e, 0.4)}
          onMouseOut={useResetMagnet}
        >
          <Wave ref={animatedWaveRef} color={isDark ? COLORS.WHITE : COLORS.BLUE} />
        </div>
      </div>
    );
  },
);

export default Sound;
