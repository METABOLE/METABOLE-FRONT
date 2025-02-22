import { useMousePosition } from '@/hooks/useMousePosition';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import FloatingHalo from './FloatingHalo';
import LeadForm from './LeadForm';
import Time from './Time';

const Footer = () => {
  const wrapperRef = useRef(null);
  const floatingHaloRef = useRef<HTMLDivElement>(null);

  const { x, y } = useMousePosition(wrapperRef);
  const { contextSafe } = useGSAP();

  const resetHaloPosition = contextSafe(() => {
    gsap.to(floatingHaloRef.current, {
      x: 0,
      y: 0,
      duration: 3,
    });
  });

  const moveHalo = contextSafe(() => {
    gsap.to(floatingHaloRef.current, {
      x: x,
      y: y,
      duration: 2,
    });
  });

  useGSAP(() => {
    gsap.to(wrapperRef.current, {
      scrollTrigger: {
        scrub: 1,
      },
      y: 0,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <footer
      ref={wrapperRef}
      className="px-x-half-default fixed bottom-0 h-48 w-screen translate-y-36"
    >
      <div
        className="px-x-half-default relative h-full overflow-hidden rounded-t-3xl bg-black text-white"
        onMouseLeave={resetHaloPosition}
        onMouseMove={moveHalo}
      >
        <FloatingHalo
          ref={floatingHaloRef}
          className="h-[100vw] w-[100vw] opacity-30"
          from="#3449FF"
          to="#141418"
        />
        <div className="relative grid h-full grid-cols-12 items-center gap-5">
          <p>Paris</p>
          <Time isDark={true} />
          <a href="mailto:contact@metabole.studio">contact@metabole.studio</a>
          <div className="col-span-4 -col-end-1 text-white">
            <LeadForm />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
