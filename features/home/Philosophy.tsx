import AnimatedText from '@/components/shared/AnimatedText';
import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import ScrollButton from '@/components/ui/ScrollButton';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const { isFrench, getInternalPath } = useLanguage();

  // const wrapperImageRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { contextSafe } = useGSAP();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  const scrollAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          id: 'philosophy-scroll',
        },
      })
      .fromTo(
        imageRef.current,
        {
          scale: 0.8,
        },
        {
          scale: 1,
          duration: 1,
          ease: 'none',
        },
      )
      // .fromTo(
      //   imageRef.current,
      //   {
      //     scale: 1,
      //   },
      //   {
      //     scale: 0.8,
      //     duration: 1,
      //     ease: 'none',
      //   },
      // )
      // .fromTo(
      //   wrapperImageRef.current,
      //   {
      //     scale: 0.8,
      //   },
      //   {
      //     scale: 1,
      //     duration: 1,
      //     ease: 'none',
      //   },
      //   '<',
      // )
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
    ScrollTrigger.getById('philosophy-scroll')?.kill();

    if (isMobile) {
      gsap.set(titleRef.current, { x: 0 });
      gsap.set(descriptionRef.current, { x: 0 });
      return;
    }

    scrollAnimation();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="px-x-double-default gap-y-y-default-double pb-y-double-default flex flex-col items-center"
    >
      <ScrollButton />
      <div className="group/image md:w-ful relative aspect-video w-full">
        <IconCross
          className="ease-power4-in-out absolute -top-6 -left-6 hidden transition-transform duration-500 group-hover/image:-translate-4 md:block"
          color={COLORS.BLUE}
        />
        <IconCross
          className="ease-power4-in-out absolute -top-6 -right-6 hidden transition-transform duration-500 group-hover/image:translate-x-4 group-hover/image:-translate-y-4 md:block"
          color={COLORS.BLUE}
        />
        <IconCross
          className="ease-power4-in-out absolute -right-6 -bottom-6 hidden transition-transform duration-500 group-hover/image:translate-4 md:block"
          color={COLORS.BLUE}
        />
        <IconCross
          className="ease-power4-in-out absolute -bottom-6 -left-6 hidden transition-transform duration-500 group-hover/image:-translate-x-4 group-hover/image:translate-y-4 md:block"
          color={COLORS.BLUE}
        />
        <Image
          ref={imageRef}
          alt="Philosophy"
          className="h-full w-full rounded-3xl object-cover object-top"
          height={1920}
          src="/images/matteo-and-jerome.png"
          width={1080}
          priority
        />
        {/* <div ref={wrapperImageRef} className="overflow-hidden rounded-3xl">
            <div ref={imageRef} className="relative">
              <Image
                alt="Philosophy"
                className="h-full w-full scale-130 object-cover object-top"
                height={1920}
                src="/images/matteo-and-jerome.png"
                width={1080}
                priority
              />
            </div>
          </div> */}
      </div>
      <AnimatedText
        ref={titleRef}
        className="h2 relative mr-auto md:w-2/3"
        duration={1.2}
        stagger={0.02}
        start="top+=300px 80%"
        variant="h2"
      >
        {isFrench ? (
          <>
            Metabole est un <span className="text-blue">studio créatif</span> qui conçoit des{' '}
            <span className="text-blue">expériences intéractives</span> et{' '}
            <span className="text-blue">performantes</span>.
          </>
        ) : (
          <>
            Metabole is a <span className="text-blue">creative studio</span> that designs{' '}
            <span className="text-blue">interactive</span> and{' '}
            <span className="text-blue">high-performance</span> experiences.
          </>
        )}
      </AnimatedText>
      <AnimatedText
        ref={descriptionRef}
        className="p2 relative ml-auto md:w-1/2"
        duration={0.8}
        stagger={0.005}
      >
        {isFrench ? (
          <>
            En mettant l'accent sur l'<span className="text-blue">esthétique</span> et l'
            <span className="text-blue">accessibilité</span>, nous imaginons des interfaces{' '}
            <span className="text-blue">fluides</span> et
            <span className="text-blue">innovantes</span>, pensées pour{' '}
            <span className="text-blue">évoluer</span> avec les besoins de{' '}
            <span className="text-blue">demain</span>.
          </>
        ) : (
          <>
            By focusing on <span className="text-blue">aesthetics</span> and{' '}
            <span className="text-blue">accessibility</span>, we imagine fluid and innovative
            interfaces, thought to <span className="text-blue">evolve</span> with the needs of
            tomorrow.
          </>
        )}
      </AnimatedText>
      <Button href={getInternalPath('/services')} scroll={false}>
        {isFrench ? 'NOS SERVICES' : 'OUR SERVICES'}
      </Button>
    </section>
  );
};

export default Philosophy;
