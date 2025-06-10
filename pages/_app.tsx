import PageTransition from '@/components/PageTransition';
import ScreenLoader from '@/components/ScreenLoader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import { fetchProjects } from '@/services/projects.service';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { ProjectType } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactElement, type ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface CustomAppProps extends AppProps {
  Component: NextPageWithLayout;
  globalProps: {
    projects: ProjectType[];
  };
}

function App({ Component, pageProps, globalProps }: CustomAppProps) {
  const pathname = usePathname();
  const isScreenLoader = useIsScreenLoader();

  const getLayout =
    Component.getLayout || ((page) => <Layout projects={globalProps.projects}>{page}</Layout>);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('attachInternals' in HTMLElement.prototype)) {
      import('element-internals-polyfill');
    }
  }, []);

  return (
    <AppProvider>
      {getLayout(
        <>
          {isScreenLoader && <ScreenLoader />}
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 100);
            }}
          >
            <PageTransition key={pathname}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </>,
      )}
    </AppProvider>
  );
}

App.getInitialProps = async () => {
  const projects = await fetchProjects();

  return {
    globalProps: {
      projects,
    },
  };
};

export default App;
