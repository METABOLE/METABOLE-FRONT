import { createContext, ReactNode, useContext, useState } from 'react';

const SoundContext = createContext({
  isSoundOn: false,
  setIsSoundOn: (_: boolean) => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundOn, _setIsSoundOn] = useState(false);

  const setIsSoundOn = (isSoundOn: boolean) => {
    _setIsSoundOn(isSoundOn);
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, setIsSoundOn }}>{children}</SoundContext.Provider>
  );
};
