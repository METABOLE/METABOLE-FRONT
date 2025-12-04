import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import ScrollingContainer from '@/components/ui/ScrollingContainer';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const [isIndexFrench, setIsIndexFrench] = useState(false);

  useEffect(() => {
    setIsIndexFrench(navigator.language.includes('fr'));
  }, []);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const { performanceLevel } = usePerformance();

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
      ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
        filter: 'blur(10px)',
      }),
    });
    gsap.set(splitDescription.words, {
      yPercent: 100,
      opacity: 0,
      ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
        filter: 'blur(10px)',
      }),
    });

    gsap
      .timeline({
        delay: 0.6,
      })
      .to(splitTitle.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
          filter: 'blur(0px)',
        }),
        stagger: 0.02,
        ease: 'power4.out',
      })
      .to(
        splitDescription.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
            filter: 'blur(0px)',
          }),
          stagger: 0.02,
          ease: 'power4.out',
        },
        '-=1',
      );
  });

  const scrollAnimation = contextSafe(() => {
    ScrollTrigger.getById('index-scroll')?.kill();

    if (isMobile) {
      gsap.set(titleRef.current, { x: 0 });
      gsap.set(descriptionRef.current, { x: 0 });
      return;
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          id: 'index-scroll',
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
    scrollAnimation();
    revealAnimation();
  }, [isMobile, isFrench]);

  return (
    <section
      ref={sectionRef}
      className="pt-y-double-default gap-y-y-default pb-y-default flex min-h-screen w-screen flex-col justify-between"
    >
      <ScrollingContainer scrollSpeed={15}>
        <div className="flex shrink-0 flex-row gap-x-7 pl-7">
          <h1 className="text-blue !text-[70px] !leading-normal md:!text-[120px]">METABOLE</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="!text-[70px] !leading-normal text-black md:!text-[120px]">STUDIO</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="text-blue !text-[70px] !leading-normal md:!text-[120px]">METABOLE</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="!text-[70px] !leading-normal text-black md:!text-[120px]">STUDIO</h1>
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
            {isIndexFrench ? (
              <>
                <span>Metabole est un </span>
                <span className="text-blue">studio créatif</span>
                <span> qui conçoit des </span>
                <span className="text-blue">expériences interactives</span>
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
            <span>Ce site est disponible en </span>
            <span className="text-blue">français</span>
            <span> et en </span>
            <span className="text-blue">anglais</span>
            <span> / This website is available in </span>
            <span className="text-blue">French</span>
            <span> and </span>
            <span className="text-blue">English</span>
          </p>
        </div>
      </div>

      <div className="px-x-default flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button color="secondary" href="/fr">
              Français
            </Button>
            <Button color="secondary" href="/en">
              English
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
