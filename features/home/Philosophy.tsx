import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import ScrollButton from '@/components/ui/ScrollButton';
import AnimatedText from '@/components/shared/AnimatedText';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const { isFrench, getInternalPath } = useLanguage();
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      .fromTo(
        imageRef.current,
        {
          scale: 0.5,
        },
        {
          scale: 1,
          duration: 1,
          ease: 'none',
        },
      )
      .fromTo(
        titleRef.current,
        {
          y: -300,
        },
        {
          y: 0,
          duration: 2,
          ease: 'none',
        },
        '<',
      )
      .fromTo(
        buttonRef.current,
        {
          y: -300,
        },
        {
          y: 0,
          duration: 2,
          ease: 'none',
        },
        '<',
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-x-double-default gap-y-default pb-y-default flex flex-col items-center"
    >
      <ScrollButton />
      <div className="group/image relative aspect-video w-full md:w-2/3">
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
          className="h-full w-full rounded-3xl object-cover"
          height={1920}
          src="/images/placeholder.png"
          width={1080}
        />
      </div>
      <AnimatedText
        ref={titleRef}
        className="h2 relative mr-auto pt-[300px] md:w-1/2"
        duration={1.2}
        start="top+=300px 80%"
        variant="h2"
      >
        {isFrench ? (
          <>
            Metabole est un <span className="text-blue">studio créatif</span> qui conçoit des{' '}
            <span className="text-blue">expériences intéractives</span> et
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
      <div className="relative ml-auto -translate-y-28 md:w-1/2">
        <AnimatedText className="p2 pb-8" duration={0.8}>
          En mettant l'accent sur l'<span className="text-blue">esthétique</span> et l'
          <span className="text-blue">accessibilité</span>, nous imaginons des interfaces{' '}
          <span className="text-blue">fluides</span> et
          <span className="text-blue">innovantes</span>, pensées pour{' '}
          <span className="text-blue">évoluer</span> avec les besoins de demain.
        </AnimatedText>
      </div>
      <div ref={buttonRef}>
        <Button href={getInternalPath('/contact')}>
          {isFrench ? 'DECOUVRIR NOS SERVICES' : 'DISCOVER OUR SERVICES'}
        </Button>
      </div>
    </section>
  );
};

export default Philosophy;
