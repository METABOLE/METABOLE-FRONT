import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import metaboleFull from '../public/lotties/metabole-full.json';
import Lottie from './Lottie';

const ScreenLoader = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shuttersRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!wrapperRef.current || !shuttersRefs.current.length) return;

    gsap
      .timeline({
        delay: 0.9,
      })
      .to(logoRef.current, {
        x: 0,
        duration: 1.3,
        ease: 'power3.out',
      })
      .to(
        logoContainerRef.current,
        {
          height: 0,
          duration: 0.3,
        },
        '+=1',
      )
      .to(
        shuttersRefs.current,
        {
          scaleY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.inOut',
        },
        '-=0.6',
      )
      .set(wrapperRef.current, {
        display: 'none',
      });
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[990] grid h-screen w-screen grid-rows-4">
      <div
        ref={logoContainerRef}
        className="absolute top-1/3 left-0 z-20 flex h-16 w-screen justify-center overflow-hidden"
      >
        <div ref={logoRef} className="translate-x-[169px]">
          <Lottie animationData={metaboleFull} className="h-16" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            shuttersRefs.current[i] = el;
          }}
          className="h-full w-full origin-top bg-black"
        />
      ))}
    </div>
  );
};

export default ScreenLoader;
