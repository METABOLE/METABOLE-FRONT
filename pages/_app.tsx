import PageTransition from '@/components/layout/PageTransition';
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
import { useEffect, useMemo, type ReactElement, type ReactNode } from 'react';

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
  // const isScreenLoader = useIsScreenLoader();
  // const { lockScroll } = useScrollLock();

  const transitionKey = useMemo(() => {
    return pathname.replace(/^\/(fr|en)/, '') || '/';
  }, [pathname]);

  const getLayout =
    Component.getLayout || ((page) => <Layout projects={globalProps.projects}>{page}</Layout>);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('attachInternals' in HTMLElement.prototype)) {
      import('element-internals-polyfill');
    }
  }, []);

  // useEffect(() => {
  //   if (isScreenLoader) {
  //     lockScroll(true);
  //   } else {
  //     lockScroll(false);
  //   }
  // }, [isScreenLoader]);

  return (
    <AppProvider>
      {getLayout(
        <>
          {/* {isScreenLoader && <ScreenLoader />} */}
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 100);
            }}
          >
            <PageTransition key={transitionKey}>
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
