import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { LogoIcon } from './Icons';

const ScreenLoader = () => {
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);
  const shuttersRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!wrapperRef.current || !shuttersRefs) return;

    gsap
      .timeline({
        delay: 0.5,
      })
      .to(logoRef.current, {
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out',
      })
      .to(
        logoRef.current,
        {
          scale: 0,
          duration: 0.6,
          ease: 'power2.inOut',
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
        '-=0.2',
      )
      .to(
        shuttersRefs.current,
        {
          opacity: 0,
          duration: 0.3,
          stagger: 0,
          ease: 'power2.inOut',
        },
        '-=0.3',
      )
      .set(wrapperRef.current, {
        display: 'none',
      });
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[990] grid h-screen w-screen grid-rows-4">
      <LogoIcon ref={logoRef} className="absolute top-1/2 left-1/2 -translate-1/2 scale-0" />
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
