import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger, SplitText);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isFrench } = useLanguage();
  const isScreenLoader = useIsScreenLoader();

  const { x, y } = useMousePosition();

  const [isContactOpen, setIsContactOpen] = useState(false);

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
      <Header isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
      <main className="min-h-screen pb-[300px]">{children}</main>
      <Footer setIsContactOpen={setIsContactOpen} />
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
