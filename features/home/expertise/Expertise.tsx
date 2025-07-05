import FloatingHalo from '@/components/shared/FloatingHalo';
import Button from '@/components/ui/Button';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import ExpertiseDesktop from './ExpertiseDesktop';
import ExpertiseMobile from './ExpertiseMobile';
import { IconCross } from '@/components/ui/Icons';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText);

const Expertise = ({ isPageServices = false }: { isPageServices?: boolean }) => {
  const titleRef = useRef(null);

  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const { isFrench, getInternalPath } = useLanguage();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    const splitTitle = new SplitText(titleRef.current, {
      type: 'chars',
      mask: 'chars',
    });

    gsap.set(splitTitle.chars, {
      yPercent: 100,
    });

    gsap.to(splitTitle.chars, {
      yPercent: 0,
      duration: 1,
      stagger: 0.01,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 75%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <section className="px-x-default py-y-double-default relative flex flex-col overflow-hidden bg-black">
      <FloatingHalo
        className="pointer-events-none absolute bottom-0 -left-1/2 z-30 h-[200vw] w-[200vw] translate-1/3 opacity-30"
        from="#1b17ee"
        to="#14141800"
      />
      <h1 ref={titleRef} className="relative w-fit text-white">
        {isFrench ? 'NOS EXPERTISES' : 'OUR EXPERTISES'}
        <IconCross className="absolute -right-10 bottom-0 hidden md:block" color={COLORS.WHITE} />
      </h1>
      <div className="py-y-default overflow-hidden">
        {isMobile ? <ExpertiseMobile /> : <ExpertiseDesktop />}
      </div>
      {!isPageServices && (
        <Button
          className="z-30"
          color="primary"
          href={getInternalPath('/services')}
          isDark={true}
          scroll={false}
        >
          {isFrench ? 'NOS SERVICES' : 'OUR SERVICES'}
        </Button>
      )}
    </section>
  );
};

export default Expertise;
