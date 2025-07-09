import FloatingHalo from '@/components/shared/FloatingHalo';
import Hint from '@/components/ui/Hint';
import { IconCross } from '@/components/ui/Icons';
import { TIMELINE } from '@/constants/timeline.constant';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const imageRef = useRef(null);

  const { isFrench } = useLanguage();

  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    const splitTexts = titleRefs
      .map((ref) => {
        if (ref.current) {
          return new SplitText(ref.current, {
            type: 'chars',
            mask: 'chars',
          });
        }
        return null;
      })
      .filter(Boolean);

    splitTexts.forEach((split) => {
      if (split) {
        gsap.set(split.chars, {
          yPercent: 100,
        });
      }
    });

    const timeline = gsap.timeline({
      delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION,
    });

    splitTexts.forEach((split, index) => {
      if (split) {
        timeline.to(
          split.chars,
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.01,
            ease: 'power4.out',
          },
          index * 0.1,
        );
      }
    });
  });

  const scrollAnimation = contextSafe(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      titleRefs.map((ref) => ref.current),
      {
        xPercent: (index) => (index % 2 === 0 ? 110 : -110),
        stagger: 0.2,
        ease: 'power2.inOut',
        duration: 2,
      },
      0,
    );

    tl.to(
      imageRef.current,
      {
        scale: 1,
        duration: 2,
        ease: 'power2.inOut',
      },
      '-=1.7',
    );
  });

  useGSAP(() => {
    revealAnimation();
  }, [isFrench]);

  useGSAP(() => {
    scrollAnimation();
  }, []);

  return (
    <>
      <Hint containerId="hint-team-hero" isDark={true} isLeft={true}>
        {isFrench ? (
          <p>
            Nous sommes deux créatifs, unis par le souci du détail et le goût des belles choses.
            C'est la parfaite symbiose de nos compétences qui a donné naissance à Metabole.
            <br />
            <br />
            Notre objectif est de pouvoir créer des produits qui répondent aux problématiques de
            l’écosystème web actuel et futur, tout en garantissant une qualité de livrable
            exceptionnelle.
          </p>
        ) : (
          <p>
            We are two creatives, united by the desire for detail and the taste for beautiful
            things. It is the perfect synergy of our skills that has given birth to Metabole.
            <br />
            <br />
            Our goal is to be able to create products that respond to the problems of the current
            and future web ecosystem, while ensuring exceptional quality of delivery.
          </p>
        )}
      </Hint>
      <section
        ref={sectionRef}
        className="pt-y-double-default px-x-default pb-y-default relative flex min-h-screen flex-col justify-evenly"
      >
        <FloatingHalo
          className="pointer-events-none absolute top-0 left-0 -z-10 h-[200vh] w-[200vh] opacity-40"
          from="#1b17ee"
          to="#f1f2ff00"
        />
        <div className="relative">
          <h1 ref={titleRefs[0]} className="text-left text-[50px] !leading-normal md:!text-[90px]">
            {isFrench ? 'INNOVER' : 'INNOVATE'}
          </h1>
          <IconCross
            className="absolute -top-10 -right-10 hidden -translate-y-1/2 md:block"
            color={COLORS.BLUE}
          />
        </div>
        <div className="relative">
          <h1
            ref={titleRefs[1]}
            className="text-blue text-right text-[50px] !leading-normal md:!text-[90px]"
          >
            {isFrench ? 'DESIGNER' : 'DESIGNER'}
          </h1>
          <IconCross
            className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
            color={COLORS.BLACK}
          />
        </div>
        <div className="relative">
          <h1 ref={titleRefs[2]} className="pl-[15vw] text-[50px] !leading-normal md:!text-[90px]">
            {isFrench ? 'CRÉER' : 'CREATE'}
          </h1>
          <IconCross
            className="absolute top-1/2 right-1/4 hidden -translate-y-1/2 md:block"
            color={COLORS.BLUE}
          />
        </div>
        <div className="relative">
          <h1
            ref={titleRefs[3]}
            className="text-blue pr-[25vw] text-right text-[50px] !leading-normal md:!text-[90px]"
          >
            {isFrench ? 'SUBLIMER' : 'SUBLIMATE'}
          </h1>
          <IconCross
            className="absolute -right-10 -bottom-10 hidden md:block"
            color={COLORS.BLACK}
          />
        </div>
        <div
          ref={imageRef}
          className="px-x-default pt-y-double-default pb-y-default absolute top-0 left-0 h-screen w-screen scale-0"
        >
          <Image
            alt="Matteo and Jerome"
            className="h-full w-full rounded-3xl object-cover object-top"
            height={1920}
            id="hint-team-hero"
            src="/images/matteo-and-jerome.png"
            width={1080}
            priority
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
