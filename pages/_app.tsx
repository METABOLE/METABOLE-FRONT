import '@/styles/tailwind.css';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/providers/root';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
