import FloatingHalo from '@/components/shared/FloatingHalo';
import { IconCross } from '@/components/ui/Icons';
import ScrollButton from '@/components/ui/ScrollButton';
import ScrollingContainer from '@/components/ui/ScrollingContainer';
import { TIMELINE } from '@/constants/timeline.constant';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  const revealAnimation = contextSafe(() => {
    const splitTitle = new SplitText(titleRef.current, {
      type: 'words',
    });
    const splitDescription = new SplitText(descriptionRef.current, {
      type: 'words',
    });

    gsap.set(splitTitle.words, {
      yPercent: 100,
      opacity: 0,
      filter: 'blur(10px)',
    });
    gsap.set(splitDescription.words, {
      yPercent: 100,
      opacity: 0,
      filter: 'blur(10px)',
    });

    gsap
      .timeline({
        delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION,
      })
      .to(splitTitle.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        filter: 'blur(0px)',
        stagger: 0.02,
        ease: 'power4.out',
      })
      .to(
        splitDescription.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          filter: 'blur(0px)',
          stagger: 0.02,
          ease: 'power4.out',
        },
        '-=1',
      );
  });

  const scrollAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          id: 'services-scroll',
        },
      })
      .fromTo(
        titleRef.current,
        {
          x: -100,
        },
        {
          x: 100,
          duration: 2,
          ease: 'none',
        },
        '<',
      )
      .fromTo(
        descriptionRef.current,
        {
          x: 100,
        },
        {
          x: -100,
          duration: 2,
          ease: 'none',
        },
        '<',
      );
  });

  useGSAP(() => {
    revealAnimation();
    ScrollTrigger.getById('services-scroll')?.kill();

    if (isMobile) {
      gsap.set(titleRef.current, { x: 0 });
      gsap.set(descriptionRef.current, { x: 0 });
      return;
    }
    scrollAnimation();
  }, [isMobile, isFrench]);

  return (
    <section
      ref={sectionRef}
      className="pt-y-double-default gap-y-y-default pb-y-default relative flex min-h-screen w-screen flex-col justify-between"
    >
      <div className="absolute inset-0 overflow-hidden">
        <FloatingHalo
          className="pointer-events-none absolute top-0 -left-1/3 -z-10 h-[150vw] w-[150vw] opacity-40"
          from="#1b17ee"
          to="#f1f2ff00"
        />
      </div>
      <ScrollingContainer scrollSpeed={15}>
        <div className="flex shrink-0 flex-row gap-x-7 pl-7">
          <h1 className="text-blue !text-[70px] !leading-normal md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="!text-[70px] !leading-normal text-black md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="text-blue !text-[70px] !leading-normal md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="!text-[70px] !leading-normal text-black md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
        </div>
      </ScrollingContainer>
      <div className="px-x-default">
        <div className="md:pl-[10vw]">
          <h2 ref={titleRef} className="relative w-[60vw] md:w-[50vw]">
            <IconCross
              className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
              color={COLORS.BLUE}
            />
            {isFrench ? (
              <>
                <span>Metabole est un </span>
                <span className="text-blue">studio créatif</span>
                <span> qui conçoit des </span>
                <span className="text-blue">expériences intéractives</span>
                <span> et </span>
                <span className="text-blue">performantes</span>
                <span>.</span>
              </>
            ) : (
              <>
                <span>Metabole is a </span>
                <span className="text-blue">creative studio</span>
                <span> that designs </span>
                <span className="text-blue">interactive experiences</span>
                <span> and </span>
                <span className="text-blue">performant</span>
                <span>.</span>
              </>
            )}
          </h2>
        </div>
      </div>
      <div className="px-x-default">
        <div className="md:pr-[5vw]">
          <p ref={descriptionRef} className="p2 relative ml-auto w-[60vw] md:w-[40vw]">
            <IconCross
              className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
              color={COLORS.BLUE}
            />
            {isFrench ? (
              <>
                <span>En mettant l'accent sur </span>
                <span className="text-blue">l'esthétique</span>
                <span> et </span>
                <span className="text-blue">l'accessibilité</span>
                <span>, nous imaginons des interfaces fluides et </span>
                <span className="text-blue">innovantes</span>
                <span>, pensées pour </span>
                <span className="text-blue">évoluer</span>
                <span> avec les besoins de demain.</span>
              </>
            ) : (
              <>
                <span>By focusing on </span>
                <span className="text-blue">aesthetics</span>
                <span> and </span>
                <span className="text-blue">accessibility</span>
                <span>, we imagine fluid and </span>
                <span className="text-blue">innovative</span>
                <span> interfaces, designed to </span>
                <span className="text-blue">evolve</span>
                <span> with tomorrow's needs.</span>
              </>
            )}
          </p>
        </div>
      </div>
      <div className="px-x-default flex justify-center">
        <ScrollButton />
      </div>
    </section>
  );
};

export default Hero;
