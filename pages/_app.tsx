import PageTransition from '@/components/layout/PageTransition';
import ScreenLoader from '@/components/layout/ScreenLoader';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useScroll } from '@/hooks/useScroll';
import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import { fetchProjects } from '@/services/projects.service';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { ProjectType } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
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
  const { isDev } = useEnvironment();
  const { lockScroll } = useScroll();
  const lenis = useLenis();

  const getLayout =
    Component.getLayout || ((page) => <Layout projects={globalProps.projects}>{page}</Layout>);

  const handdlePageChange = () => {
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView();
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !('attachInternals' in HTMLElement.prototype)) {
      import('element-internals-polyfill');
    }
  }, []);

  useEffect(() => {
    if (isScreenLoader && !isDev) {
      lockScroll(true);
    } else {
      lockScroll(false);
    }
  }, [isScreenLoader, isDev, lenis]);

  return (
    <AppProvider>
      {isScreenLoader && !isDev && <ScreenLoader />}
      {getLayout(
        <>
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              handdlePageChange();
              // Use requestAnimationFrame + longer delay to batch reflows
              requestAnimationFrame(() => {
                setTimeout(() => {
                  ScrollTrigger.refresh();
                }, 300);
              });
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
