import InstancedField from '@/components/CrossBackground/Scene';
import FloatingHalo from '@/components/FloatingHalo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScreenLoader from '@/components/ScreenLoader';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useLanguage } from '@/providers/language.provider';
import { AppProvider } from '@/providers/root';
import { setupTitleChanger } from '@/utils/changeTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProd } = useEnvironment();
  const { isFrench } = useLanguage();

  useEffect(() => {
    setupTitleChanger({ isFrench });
  }, [isFrench]);

  return (
    <AppProvider>
      <Head>
        <title>METABOLE STUDIO</title>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </Head>
      <Header />
      {isProd && <ScreenLoader />}
      <main className="h-[140vh]">{children}</main>
      <Footer />
      <InstancedField />
      <FloatingHalo
        className="!fixed top-1/2 -left-full -z-10 h-[250vw] w-[250vw]"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      {/* <Analytics />
      <SpeedInsights /> */}
    </AppProvider>
  );
};

export default Layout;
