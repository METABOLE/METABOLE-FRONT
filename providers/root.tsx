import { ReactNode } from 'react';
import { LanguageProvider } from './language.provider';
import { QueryProvider } from './query.provider';
import { SoundProvider } from './sound.provider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <SoundProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </SoundProvider>
    </QueryProvider>
  );
};
