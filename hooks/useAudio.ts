import { useCallback, useEffect, useRef } from 'react';

export const useAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src) return;

    audioRef.current = new Audio(src);
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return {
    play,
    pause,
    stop,
  };
};
