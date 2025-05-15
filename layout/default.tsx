import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Lottie from '@/components/Lottie';
import SEO from '@/components/SEO';
import useIsLocalhost from '@/hooks/useIsLocalhost';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ReactNode, useRef } from 'react';
import metaboleFull from '../public/lotties/metabole-full-loader.json';
gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
  const isLocalhost = useIsLocalhost();
  const { isFrench } = useLanguage();
  const { x, y } = useMousePosition();

  const lottieRef = useRef(null);
  const backgroundRef = useRef(null);

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
      {!isLocalhost && (
        <div
          ref={lottieRef}
          className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <Lottie animationData={metaboleFull} className="h-48" loop={false} />
        </div>
      )}
      <main className="min-h-screen pb-[300px]">{children}</main>
      <Footer />
      <Image
        ref={backgroundRef}
        alt="background"
        className="fixed inset-0 -z-20 h-screen w-screen scale-500 object-cover opacity-0"
        height={2160}
        src="/images/background.png"
        width={3840}
      />
    </>
  );
};

export default Layout;
