import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import SEO from '@/components/SEO';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, ProjectType } from '@/types';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/all';
import Image from 'next/image';
import { ReactNode, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger, SplitText);

const Layout = ({ projects, children }: { projects: ProjectType[]; children: ReactNode }) => {
  const { isFrench } = useLanguage();
  const isScreenLoader = useIsScreenLoader();
  const isTablet = useMatchMedia(BREAKPOINTS.MD);

  const { x, y } = useMousePosition();

  const backgroundRef = useRef(null);

  gsap.to(backgroundRef.current, {
    duration: 0.8,
    y: y / 90,
    x: x / 90,
    ease: 'power2.out',
  });

  useGSAP(() => {
    gsap
      .timeline({
        delay: isScreenLoader ? 3.35 : 0.2,
      })
      .to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'expo.out',
      });
  }, [isScreenLoader]);

  return (
    <>
      <SEO isFrench={isFrench} />
      {isTablet ? <Burger /> : <Menu projects={projects} />}
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
