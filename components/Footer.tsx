import { useMousePosition } from '@/hooks/useMousePosition';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import FloatingHalo from './FloatingHalo';
import Language from './Language';
import LeadForm from './LeadForm';
import Time from './Time';

const Footer = () => {
  const wrapperRef = useRef(null);
  const footerRef = useRef<HTMLDivElement>(null);
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
    gsap.to(footerRef.current, {
      delay: 3.1,
      duration: 2,
      ease: 'power4.out',
      y: 0,
      onComplete: () => {
        if (!footerRef.current) return;
        footerRef.current.style.transform = 'none';
        footerRef.current.style.translate = 'none';
        footerRef.current.style.rotate = 'none';
        footerRef.current.style.scale = 'none';
      },
    });
    gsap.to(wrapperRef.current, {
      scrollTrigger: {
        scrub: 1,
      },
      y: 40,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <footer
      ref={wrapperRef}
      className="px-x-half-default fixed bottom-[40px] w-screen translate-y-[100%]"
      id="wrapper-footer"
    >
      <div
        ref={footerRef}
        className="translate-y-full overflow-hidden rounded-t-3xl duration-[2s] ease-in-out"
        id="footer"
      >
        <div
          className="relative h-full overflow-hidden rounded-t-3xl bg-black px-[52px] py-11 text-white"
          onMouseLeave={resetHaloPosition}
          onMouseMove={moveHalo}
          onMouseEnter={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }}
        >
          <FloatingHalo
            ref={floatingHaloRef}
            className="h-[100vw] w-[100vw] opacity-30"
            from="#3449FF"
            to="#141418"
          />
          <div className="relative flex h-full flex-col gap-11 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="flex w-full flex-col gap-3 xl:flex-row xl:items-center xl:gap-10">
              <p className="">Paris | Rotterdam</p>
              <div className="">
                <Time isDark={true} />
              </div>
              <Link className="cursor-pointer" href="mailto:contact@metabole.studio">
                contact@metabole.studio
              </Link>
              <Language isDark={true} />
            </div>
            <div className="bg-yellow-30 h-px w-10 sm:hidden" />
            <LeadForm className="w-full text-white lg:w-1/3 lg:min-w-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
