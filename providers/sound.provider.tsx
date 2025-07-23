import { createContext, ReactNode, useContext } from 'react';
import { useSound as useSoundHook } from '@/hooks/useSound';

const SoundContext = createContext({
  isSoundOn: false,
  toggleSound: () => {},
  initializeAudio: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const soundHook = useSoundHook();

  return <SoundContext.Provider value={soundHook}>{children}</SoundContext.Provider>;
};
