import FallingCrosses from '@/components/FallingCrosses';
import FloatingHalo from '@/components/FloatingHalo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Lottie from '@/components/Lottie';
import SEO from '@/components/SEO';
import { useMousePosition } from '@/hooks/useMousePosition';
import useWindowResizeReload from '@/hooks/useReloadResize';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
import metaboleFull from '../public/lotties/metabole-full-loader.json';
gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
  useWindowResizeReload();

  const { isFrench } = useLanguage();
  const { x, y } = useMousePosition();

  const lottieRef = useRef(null);
  const haloRef = useRef(null);
  const backgroundRef = useRef(null);

  const [showFallenCrosses, setShowFallenCrosses] = useState(false);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //   });

  //   const defaultTitle = 'Metabole STUDIO';
  //   const alternateTitles = isFrench
  //     ? ['Expériences web uniques', 'Un studio créatif']
  //     : ['Unique web experiences', 'A creative studio'];

  //   let titleIndex = 0;
  //   let intervalId: number | null = null;

  //   const changeTitle = () => {
  //     titleIndex = titleIndex === 0 ? 1 : 0;
  //     document.title = alternateTitles[titleIndex];
  //   };

  //   document.addEventListener('visibilitychange', () => {
  //     if (document.hidden) {
  //       const [firstTitle] = alternateTitles;
  //       document.title = firstTitle;
  //       intervalId = window.setInterval(changeTitle, 3000);
  //     } else {
  //       document.title = defaultTitle;
  //       if (intervalId) {
  //         clearInterval(intervalId);
  //       }
  //     }
  //   });
  // }, [isFrench]);

  gsap.to(backgroundRef.current, {
    duration: 0.8,
    y: y / 90,
    x: x / 90,
    ease: 'power2.out',
  });

  useGSAP(() => {
    gsap
      .timeline({
        delay: 3.35,
      })
      .to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'expo.out',
      })
      .to(
        lottieRef.current,
        {
          scaleY: 0,
          duration: 0.1,
        },
        '-=1.5',
      )
      .add(() => {
        setShowFallenCrosses(true);
      })
      .to(
        haloRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 4,
          ease: 'power4.out',
        },
        '<',
      )
      .set(
        lottieRef.current,
        {
          display: 'none',
        },
        '-=0.1',
      );
  }, []);

  return (
    <>
      <SEO isFrench={isFrench} />
      <Header />
      <div
        ref={lottieRef}
        className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <Lottie animationData={metaboleFull} className="h-48" loop={false} />
      </div>
      <main className="h-[300vh]">{children}</main>
      <Footer />
      <FloatingHalo
        ref={haloRef}
        className="!fixed top-[120%] -left-[90%] -z-30 h-[250vw] w-[250vw] -translate-x-full scale-50 opacity-0"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      <Image
        ref={backgroundRef}
        alt="background"
        className="fixed inset-0 -z-20 h-screen w-screen scale-500 object-cover opacity-0"
        height={2160}
        src="/images/background.png"
        width={3840}
      />
      {showFallenCrosses && <FallingCrosses className="fixed -z-10" footerSelector="#footer" />}
    </>
  );
};

export default Layout;
