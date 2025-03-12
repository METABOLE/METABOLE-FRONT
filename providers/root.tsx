import { ReactNode } from 'react';
import { LanguageProvider } from './language.provider';
import { QueryProvider } from './query.provider';
import { SoundProvider } from './sound.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <SoundProvider>
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </SoundProvider>
      <Analytics />
      <SpeedInsights />
    </QueryProvider>
  );
};
