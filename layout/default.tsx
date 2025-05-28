import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ReactNode, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isFrench } = useLanguage();
  const { isProd } = useEnvironment();
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
        delay: isProd ? 3.35 : 0.2,
      })
      .to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'expo.out',
      });
  }, [isProd]);

  return (
    <>
      <SEO isFrench={isFrench} />
      <Header />
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
