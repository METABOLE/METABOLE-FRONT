// import 'element-internals-polyfill';
import PageTransition from '@/components/PageTransition';
import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { AnimatePresence } from 'framer-motion';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactElement, type ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const pathname = usePathname();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('attachInternals' in HTMLElement.prototype)) {
      import('element-internals-polyfill');
    }
  }, []);

  return (
    <AppProvider>
      {getLayout(
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={pathname}>
            <Component {...pageProps} />
          </PageTransition>
        </AnimatePresence>,
      )}
    </AppProvider>
  );
}
