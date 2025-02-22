import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const ScreenLoader = () => {
  const wrapperRef = useRef(null);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    const { children } = wrapperRef.current;

    gsap
      .timeline()
      .to(children, {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.inOut',
      })
      .set(wrapperRef.current, {
        display: 'none',
      });
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[990] grid h-screen w-screen grid-rows-4">
      <div className="h-full w-full origin-top bg-black"></div>
      <div className="h-full w-full origin-top bg-black"></div>
      <div className="h-full w-full origin-top bg-black"></div>
      <div className="h-full w-full origin-top bg-black"></div>
    </div>
  );
};

export default ScreenLoader;
