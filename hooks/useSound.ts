import { useEffect, useState } from 'react';

const FADE_DURATION = 0.5;
const SOUND_STORAGE_KEY = 'metabole-sound-enabled';

let globalAudioRef: HTMLAudioElement | null = null;
let globalAudioContext: AudioContext | null = null;
let globalGainNode: GainNode | null = null;
let globalIsInitialized = false;

export const useSound = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);

  const setupAudio = () => {
    if (globalIsInitialized) return;

    globalAudioRef = new Audio('/sounds/ambiance.mp3');
    globalAudioRef.loop = true;

    globalAudioContext = new AudioContext();
    globalGainNode = globalAudioContext.createGain();
    const sourceNode = globalAudioContext.createMediaElementSource(globalAudioRef);

    sourceNode.connect(globalGainNode);
    globalGainNode.connect(globalAudioContext.destination);
    globalGainNode.gain.value = 0;

    if (globalAudioContext.state === 'suspended') {
      globalAudioContext.resume();
    }

    globalIsInitialized = true;
  };

  const toggleSound = () => {
    if (!globalIsInitialized) {
      setupAudio();

      try {
        const stored = localStorage.getItem(SOUND_STORAGE_KEY);
        const soundEnabled = stored !== 'false';
        setIsSoundOn(soundEnabled);
        return;
      } catch (error) {
        console.error('Erreur lors de la lecture du localStorage:', error);
      }
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

      try {
        const stored = localStorage.getItem(SOUND_STORAGE_KEY);
        const soundEnabled = stored !== 'false';
        setIsSoundOn(soundEnabled);
      } catch (error) {
        console.error('Erreur lors de la lecture du localStorage:', error);
      }
    }
  };

  useEffect(() => {
    if (!globalAudioRef || !globalIsInitialized) return;

    if (isSoundOn) {
      if (globalAudioContext?.state === 'suspended') {
        globalAudioContext.resume();
      }

      globalAudioRef.play().catch((error) => {
        console.error('Erreur lors de la lecture audio:', error);
      });

      const now = globalAudioContext!.currentTime;
      globalGainNode!.gain.cancelScheduledValues(now);
      globalGainNode!.gain.setValueAtTime(0, now);
      globalGainNode!.gain.linearRampToValueAtTime(1, now + FADE_DURATION);
    } else {
      const now = globalAudioContext!.currentTime;
      globalGainNode!.gain.cancelScheduledValues(now);
      globalGainNode!.gain.setValueAtTime(1, now);
      globalGainNode!.gain.linearRampToValueAtTime(0, now + FADE_DURATION);

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
