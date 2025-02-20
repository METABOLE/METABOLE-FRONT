import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSound } from '@/providers/sound.provider';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import Wave, { WaveHandles } from './Wave';

const Sound = ({ className }: { className?: string }) => {
  const { isSoundOn, setIsSoundOn } = useSound();
  const animatedWaveRef = useRef<WaveHandles>(null);

  useEffect(() => {
    if (isSoundOn) {
      animatedWaveRef.current?.play();
    } else {
      animatedWaveRef.current?.pause();
    }
  }, [isSoundOn]);

  return (
    <div
      className={clsx(
        'bg-blue flex h-11 w-11 cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      onClick={() => setIsSoundOn(!isSoundOn)}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      <div
        className="flex h-full w-full items-center justify-center p-2.5"
        onMouseMove={(e) => useMagnet(e, 0.4)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <Wave ref={animatedWaveRef} />
      </div>
    </div>
  );
};

export default Sound;
