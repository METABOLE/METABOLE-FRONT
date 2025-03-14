import Cursor from '@/components/Cursor';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';
import { LanguageProvider } from './language.provider';
import { QueryProvider } from './query.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { SoundProvider } from './sound.provider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <Cursor />
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
