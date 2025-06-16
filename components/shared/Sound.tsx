import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSound } from '@/providers/sound.provider';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';
import Wave, { WaveHandles } from '../ui/Wave';
import { COLORS } from '@/types';

const FADE_DURATION = 0.5;
const SOUND_STORAGE_KEY = 'metabole-sound-enabled';

type AudioResources = {
  audioContext: AudioContext;
  gainNode: GainNode;
  sourceNode: MediaElementAudioSourceNode;
};

const Sound = forwardRef<HTMLDivElement, { className?: string; isDark?: boolean }>(
  ({ className, isDark }, ref) => {
    const { isSoundOn, setIsSoundOn } = useSound();
    const animatedWaveRef = useRef<WaveHandles>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioResourcesRef = useRef<AudioResources | null>(null);
    const isInitializedRef = useRef(false);

    const setupAudio = () => {
      if (isInitializedRef.current) return;

      audioRef.current = new Audio('/sounds/ambiance.mp3');
      audioRef.current.loop = true;

      const audioContext = new AudioContext();
      const gainNode = audioContext.createGain();
      const sourceNode = audioContext.createMediaElementSource(audioRef.current);

      sourceNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      gainNode.gain.value = 0;

      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      audioResourcesRef.current = { audioContext, gainNode, sourceNode };
      isInitializedRef.current = true;
    };

    const getSoundPreference = (): boolean => {
      try {
        const stored = localStorage.getItem(SOUND_STORAGE_KEY);
        return stored !== 'false';
      } catch (error) {
        console.error('Erreur lors de la lecture du localStorage:', error);
        return true;
      }
    };

    const fadeVolume = (start: number, end: number) => {
      const resources = audioResourcesRef.current;
      if (!resources) return;

      const now = resources.audioContext.currentTime;
      resources.gainNode.gain.cancelScheduledValues(now);
      resources.gainNode.gain.setValueAtTime(start, now);
      resources.gainNode.gain.linearRampToValueAtTime(end, now + FADE_DURATION);
    };

    useEffect(() => {
      if (!audioRef.current || !isInitializedRef.current) return;

      if (isSoundOn) {
        audioRef.current.play().catch((error) => {
          console.error('Erreur lors de la lecture audio:', error);
        });
        fadeVolume(0, 1);
        animatedWaveRef.current?.play();
      } else {
        fadeVolume(1, 0);
        animatedWaveRef.current?.pause();

        const timer = setTimeout(() => {
          if (!isSoundOn && audioRef.current) {
            audioRef.current.pause();
          }
        }, FADE_DURATION * 1000);

        return () => clearTimeout(timer);
      }
    }, [isSoundOn]);

    useEffect(() => {
      const handleFirstPageClick = () => {
        if (isInitializedRef.current) return;

        setupAudio();

        const soundEnabled = getSoundPreference();
        setIsSoundOn(soundEnabled);

        document.removeEventListener('click', handleFirstPageClick);
      };

      document.addEventListener('click', handleFirstPageClick);

      return () => {
        document.removeEventListener('click', handleFirstPageClick);
      };
    }, [setIsSoundOn]);

    const toggleSound = () => {
      if (!isInitializedRef.current) {
        setupAudio();
      }

      const newSoundState = !isSoundOn;
      setIsSoundOn(newSoundState);

      try {
        localStorage.setItem(SOUND_STORAGE_KEY, newSoundState.toString());
      } catch (error) {
        console.error("Erreur lors de l'écriture dans le localStorage:", error);
      }
    };

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
