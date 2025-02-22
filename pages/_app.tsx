import '@/styles/tailwind.css';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/providers/root';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
