import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSound } from '@/providers/sound.provider';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Wave, { WaveHandles } from './Wave';

const FADE_DURATION = 0.5;

const Sound = ({ className }: { className: string }) => {
  const { isSoundOn, setIsSoundOn } = useSound();
  const animatedWaveRef = useRef<WaveHandles>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [isAudioSetup, setIsAudioSetup] = useState(false);
  const hasAddedPageClickListenerRef = useRef(false);
  const firstClickHandledRef = useRef(false);

  const setupAudio = () => {
    if (isAudioSetup) return;

    audioRef.current = new Audio('/sounds/ambiance.mp3');
    audioRef.current.loop = true;
    audioContextRef.current = new AudioContext();
    gainNodeRef.current = audioContextRef.current.createGain();
    sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);

    sourceNodeRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = 0;

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    setIsAudioSetup(true);
  };

  const fadeVolume = (start: number, end: number) => {
    if (!gainNodeRef.current || !audioContextRef.current) return;

    const now = audioContextRef.current.currentTime;
    gainNodeRef.current.gain.cancelScheduledValues(now);
    gainNodeRef.current.gain.setValueAtTime(start, now);
    gainNodeRef.current.gain.linearRampToValueAtTime(end, now + FADE_DURATION);
  };

  useEffect(() => {
    if (!audioRef.current || !isAudioSetup) return;

    if (isSoundOn) {
      audioRef.current.play().catch((error) => {
        console.error('Erreur lors de la lecture audio:', error);
      });
      fadeVolume(0, 1);
      animatedWaveRef.current?.play();
    } else {
      fadeVolume(1, 0);
      animatedWaveRef.current?.pause();
      setTimeout(() => {
        if (!isSoundOn && audioRef.current) {
          audioRef.current.pause();
        }
      }, FADE_DURATION * 1000);
    }
  }, [isSoundOn, isAudioSetup]);

  useEffect(() => {
    if (hasAddedPageClickListenerRef.current) return;

    const handleFirstPageClick = () => {
      if (firstClickHandledRef.current) return;

      setupAudio();
      setIsSoundOn(true);
      firstClickHandledRef.current = true;

      document.removeEventListener('click', handleFirstPageClick);
    };

    document.addEventListener('click', handleFirstPageClick);
    hasAddedPageClickListenerRef.current = true;

    return () => {
      document.removeEventListener('click', handleFirstPageClick);
    };
  }, []);

  const toggleSound = () => {
    if (!isAudioSetup) {
      setupAudio();
    }
    firstClickHandledRef.current = true;
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div
      className={clsx(
        'bg-blue flex h-11 w-11 cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      onClick={toggleSound}
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
