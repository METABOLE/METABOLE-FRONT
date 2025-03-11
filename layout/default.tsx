import FloatingHalo from '@/components/FloatingHalo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Lottie from '@/components/Lottie';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';
import Image from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';
import metaboleFull from '../public/lotties/metabole-full.json';
gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isFrench } = useLanguage();

  const lottieRef = useRef(null);
  const haloRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const defaultTitle = 'Metabole STUDIO';
    const alternateTitles = isFrench
      ? ['Expériences web uniques', 'Un studio créatif']
      : ['Unique web experiences', 'A creative studio'];

    let titleIndex = 0;
    let intervalId: number | null = null;

    const changeTitle = () => {
      titleIndex = titleIndex === 0 ? 1 : 0;
      document.title = alternateTitles[titleIndex];
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        const [firstTitle] = alternateTitles;
        document.title = firstTitle;
        intervalId = window.setInterval(changeTitle, 3000);
      } else {
        document.title = defaultTitle;
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    });
  }, [isFrench]);

  useGSAP(() => {
    gsap
      .timeline({
        delay: 3,
      })
      .to(lottieRef.current, {
        scale: 0,
        duration: 0.3,
        ease: 'power4.out',
      })
      .to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        duration: 3,
        ease: 'power4.out',
      })
      .to(
        haloRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 3,
          ease: 'power4.out',
        },
        '<',
      );
  }, []);

  return (
    <>
      <Head>
        <title>Metabole STUDIO</title>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </Head>
      <Header />
      <div ref={lottieRef} className="fixed top-2/5 left-1/2 z-20 h-16 -translate-x-1/2">
        <Lottie animationData={metaboleFull} />
      </div>
      <main className="h-[140vh]">{children}</main>
      <Footer />
      <FloatingHalo
        ref={haloRef}
        className="!fixed top-1/2 -left-full -z-10 h-[250vw] w-[250vw] -translate-x-full scale-50 opacity-0"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      <Image
        ref={backgroundRef}
        alt="background"
        className="fixed inset-0 -z-50 h-screen w-screen scale-200 object-cover opacity-0"
        height={2160}
        src="/images/background.png"
        width={3840}
      />
      {/* <Analytics />
      <SpeedInsights /> */}
    </>
  );
};

export default Layout;
