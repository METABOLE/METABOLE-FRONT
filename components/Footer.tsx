import { useMousePosition } from '@/hooks/useMousePosition';
import FloatingHalo from './FloatingHalo';
import Time from './Time';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

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
  return (
    <footer ref={wrapperRef} className="px-x-half-default">
      <div
        className="px-x-half-default relative grid grid-cols-6 items-center gap-5 overflow-hidden rounded-t-3xl bg-black py-8 text-white"
        onMouseLeave={resetHaloPosition}
        onMouseMove={moveHalo}
      >
        <FloatingHalo
          ref={floatingHaloRef}
          className="-z-10 h-[100vw] w-[100vw] opacity-30"
          color="#3449FF"
          to="#141418"
        />
        <p>Paris</p>
        <Time isDark={true} />
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
