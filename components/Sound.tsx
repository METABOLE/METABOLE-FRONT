import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSound } from '@/providers/sound.provider';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import Wave, { WaveHandles } from './Wave';

const FADE_DURATION = 0.5;
const SOUND_STORAGE_KEY = 'metabole-sound-disabled';
const LAST_VISIT_KEY = 'metabole-last-visit';
const SOUND_DISABLE_DURATION = 10 * 60 * 1000;
const ONE_DAY_DURATION = 24 * 60 * 60 * 1000;

type AudioResources = {
  audioContext: AudioContext;
  gainNode: GainNode;
  sourceNode: MediaElementAudioSourceNode;
};

const Sound = ({ className }: { className: string }) => {
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

  const updateLastVisit = () => {
    try {
      const currentTime = Date.now();
      localStorage.setItem(LAST_VISIT_KEY, currentTime.toString());
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la dernière visite:', error);
    }
  };

  const checkAndResetPreferences = (): boolean => {
    try {
      const lastVisitStr = localStorage.getItem(LAST_VISIT_KEY);

      if (lastVisitStr) {
        const lastVisit = parseInt(lastVisitStr, 10);
        const currentTime = Date.now();

        if (currentTime - lastVisit > ONE_DAY_DURATION) {
          localStorage.removeItem(SOUND_STORAGE_KEY);
          return true;
        }
      }

      updateLastVisit();

      return false;
    } catch (error) {
      console.error('Erreur lors de la vérification des préférences:', error);
      return false;
    }
  };

  const shouldEnableSound = (): boolean => {
    try {
      const preferencesReset = checkAndResetPreferences();
      if (preferencesReset) return true;

      const storedTime = localStorage.getItem(SOUND_STORAGE_KEY);
      if (!storedTime) return true;

      const disabledTimestamp = parseInt(storedTime, 10);
      const currentTime = Date.now();

      return currentTime - disabledTimestamp > SOUND_DISABLE_DURATION;
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
    updateLastVisit();

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

      if (shouldEnableSound()) {
        setIsSoundOn(true);
      }

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

    if (!newSoundState) {
      try {
        localStorage.setItem(SOUND_STORAGE_KEY, Date.now().toString());
      } catch (error) {
        console.error("Erreur lors de l'écriture dans le localStorage:", error);
      }
    } else {
      try {
        localStorage.removeItem(SOUND_STORAGE_KEY);
      } catch (error) {
        console.error('Erreur lors de la suppression du localStorage:', error);
      }
    }
  };

  return (
    <div
      className={clsx(
        'bg-blue flex h-11 w-11 cursor-pointer items-center justify-center rounded-full',
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
        <Wave ref={animatedWaveRef} />
      </div>
    </div>
  );
};

export default Sound;
