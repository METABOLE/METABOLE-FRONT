import Cursor from '@/components/ui/Cursor';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';
import { LanguageProvider } from './language.provider';
import { QueryProvider } from './query.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { SoundProvider } from './sound.provider';
import { PerformanceProvider } from './performance.provider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <Cursor />
      <SoundProvider>
        <PerformanceProvider>
          <LanguageProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </LanguageProvider>
        </PerformanceProvider>
      </SoundProvider>
      <Analytics />
      <SpeedInsights />
    </QueryProvider>
  );
};
