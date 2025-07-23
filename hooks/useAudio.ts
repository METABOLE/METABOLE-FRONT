import { useEffect, useRef } from 'react';
import { useSound } from '@/providers/sound.provider';

const FADE_DURATION = 0.5;
const SOUND_STORAGE_KEY = 'metabole-sound-enabled';

type AudioResources = {
  audioContext: AudioContext;
  gainNode: GainNode;
  sourceNode: MediaElementAudioSourceNode;
};

let globalAudioRef: HTMLAudioElement | null = null;
let globalAudioResources: AudioResources | null = null;
let globalIsInitialized = false;
let globalInstanceCount = 0;
let globalCleanupTimeout: NodeJS.Timeout | null = null;

export const useAudio = () => {
  const { isSoundOn, setIsSoundOn } = useSound();
  const isMountedRef = useRef(false);

  const setupAudio = () => {
    if (globalIsInitialized) return;

    globalAudioRef = new Audio('/sounds/ambiance.mp3');
    globalAudioRef.loop = true;

    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    const sourceNode = audioContext.createMediaElementSource(globalAudioRef);

    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    globalAudioResources = { audioContext, gainNode, sourceNode };
    globalIsInitialized = true;
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
    if (!globalAudioResources) return;

    const now = globalAudioResources.audioContext.currentTime;
    globalAudioResources.gainNode.gain.cancelScheduledValues(now);
    globalAudioResources.gainNode.gain.setValueAtTime(start, now);
    globalAudioResources.gainNode.gain.linearRampToValueAtTime(end, now + FADE_DURATION);
  };

  const toggleSound = () => {
    if (!globalIsInitialized) {
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

  const initializeAudio = () => {
    if (!globalIsInitialized) {
      setupAudio();
    }

    const soundEnabled = getSoundPreference();
    setIsSoundOn(soundEnabled);
  };

  const cleanupAudio = () => {
    if (globalCleanupTimeout) {
      clearTimeout(globalCleanupTimeout);
      globalCleanupTimeout = null;
    }

    if (globalAudioRef) {
      globalAudioRef.pause();
      globalAudioRef = null;
    }
    if (globalAudioResources) {
      globalAudioResources.audioContext.close();
      globalAudioResources = null;
    }
    globalIsInitialized = false;
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      globalInstanceCount++;
      isMountedRef.current = true;

      if (globalCleanupTimeout) {
        clearTimeout(globalCleanupTimeout);
        globalCleanupTimeout = null;
      }
    }

    return () => {
      globalInstanceCount--;
      isMountedRef.current = false;

      if (globalInstanceCount === 0) {
        globalCleanupTimeout = setTimeout(() => {
          if (globalInstanceCount === 0) {
            cleanupAudio();
          }
        }, 1000);
      }
    };
  }, []);

  useEffect(() => {
    if (!globalAudioRef || !globalIsInitialized) return;

    if (isSoundOn) {
      if (globalAudioResources?.audioContext.state === 'suspended') {
        globalAudioResources.audioContext.resume();
      }

      globalAudioRef.play().catch((error) => {
        console.error('Erreur lors de la lecture audio:', error);
      });
      fadeVolume(0, 1);
    } else {
      fadeVolume(1, 0);

      const timer = setTimeout(() => {
        if (!isSoundOn && globalAudioRef) {
          globalAudioRef.pause();
        }
      }, FADE_DURATION * 1000);

      return () => clearTimeout(timer);
    }
  }, [isSoundOn]);

  return {
    isSoundOn,
    toggleSound,
    initializeAudio,
  };
};
