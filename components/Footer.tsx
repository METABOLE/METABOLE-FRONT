import { useMousePosition } from '@/hooks/useMousePosition';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import FloatingHalo from './FloatingHalo';
import LeadForm from './LeadForm';
import Time from './Time';
import { useEnvironment } from '@/hooks/useEnvironment';
import Language from './Language';

const Footer = () => {
  const wrapperRef = useRef(null);
  const footerRef = useRef(null);
  const floatingHaloRef = useRef<HTMLDivElement>(null);

  const { x, y } = useMousePosition(wrapperRef);
  const { isProd } = useEnvironment();
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
      delay: isProd ? 5.5 : 8,
      duration: 2,
      ease: 'power3.out',
      y: 0,
    });
    gsap.to(wrapperRef.current, {
      scrollTrigger: {
        scrub: 1,
      },
      y: 40,
      ease: 'power1.inOut',
    });
  }, [isProd]);

  return (
    <footer
      ref={wrapperRef}
      className="px-x-half-default fixed bottom-[40px] w-screen translate-y-[100%]"
    >
      <div className="overflow-hidden rounded-t-3xl">
        <div
          ref={footerRef}
          className="relative h-full translate-y-full overflow-hidden rounded-t-3xl bg-black px-[52px] py-11 text-white"
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
              <a className="" href="mailto:contact@metabole.studio">
                contact@metabole.studio
              </a>
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
