import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSound } from '@/providers/sound.provider';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';
import Wave, { WaveHandles } from '../ui/Wave';
import { COLORS } from '@/types';
import { useTouchDevice } from '@/hooks/useTouchDevice';

const Sound = forwardRef<HTMLDivElement, { className?: string; isDark?: boolean }>(
  ({ className, isDark }, ref) => {
    const animatedWaveRef = useRef<WaveHandles>(null);
    const { isSoundOn, toggleSound, initializeAudio } = useSound();
    const isTouchDevice = useTouchDevice();

    useEffect(() => {
      animatedWaveRef.current?.[isSoundOn ? 'play' : 'pause']();

      if (!isTouchDevice) {
        const handleFirstClick = () => {
          initializeAudio();
          document.removeEventListener('click', handleFirstClick);
        };
        document.addEventListener('click', handleFirstClick);
        return () => document.removeEventListener('click', handleFirstClick);
      }
    }, [isSoundOn]);

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
