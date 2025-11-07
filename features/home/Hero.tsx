import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import { TIMELINE } from '@/constants/timeline.constant';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const { isFrench, getInternalPath } = useLanguage();

  const sectionRef = useRef(null);
  const desktopSpan1Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan2Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan3Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan4Ref = useRef<HTMLSpanElement>(null);
  const mobileTitleRef = useRef<HTMLSpanElement>(null);

  const { isAtLeast } = usePerformance();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    gsap.matchMedia().add(`(min-width: ${BREAKPOINTS.MD}px)`, () => {
      const timeline = gsap.timeline({ delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION });

      const desktopSpans = [
        desktopSpan1Ref.current,
        desktopSpan2Ref.current,
        desktopSpan3Ref.current,
        desktopSpan4Ref.current,
      ];

      const splitTexts = desktopSpans
        .map((span) => {
          if (span) {
            return new SplitText(span, {
              type: 'words',
              mask: 'words',
            });
          }
          return null;
        })
        .filter(Boolean);

      splitTexts.forEach((split) => {
        if (split) {
          gsap.set(split.words, { yPercent: 100 });
        }
      });

      splitTexts.forEach((split, index) => {
        if (split) {
          timeline.to(
            split.words,
            {
              yPercent: 0,
              duration: 1.8,
              stagger: 0.03,
              ease: 'power4.out',
            },
            index * 0.1,
          );
        }
      });
    });

    gsap.matchMedia().add(`(max-width: ${BREAKPOINTS.MD}px)`, () => {
      const timeline = gsap.timeline({ delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION });

      const split = new SplitText(mobileTitleRef.current, {
        type: 'words',
      });

      gsap.set(split.words, {
        opacity: 0,
        yPercent: 100,
        ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
          filter: 'blur(10px)',
        }),
      });

      timeline.to(split.words, {
        opacity: 1,
        yPercent: 0,
        ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
          filter: 'blur(0px)',
        }),
        duration: 1.2,
        stagger: 0.02,
        ease: 'power4.out',
      });
    });
  });

  const scrollAnimation = contextSafe(() => {
    const desktopSpans = [
      desktopSpan1Ref.current?.children,
      desktopSpan2Ref.current?.children,
      desktopSpan3Ref.current?.children,
      desktopSpan4Ref.current?.children,
    ];

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          id: 'hero-scroll',
        },
      })
      .to(desktopSpans, {
        xPercent: (index) => {
          if (index === 0) {
            return 20;
          } else if (index === 1) {
            return -20;
          } else if (index === 2) {
            return 30;
          } else if (index === 3) {
            return -10;
          }
          return 0;
        },
        display: 'inline-block',
        duration: 1.2,
        ease: 'power4.out',
      });
  });

  useGSAP(() => {
    scrollAnimation();
    revealAnimation();
  }, [isFrench]);

  return (
    <section
      ref={sectionRef}
      className="px-x-default pb-y-default flex w-screen flex-col justify-evenly pt-[calc(var(--y-default)*3)] md:min-h-[70vh]"
    >
      <h1
        className="h0 uppercase"
        aria-label={
          isFrench
            ? 'Conception de sites web uniques et immersifs pour les entreprises avant-gardistes'
            : 'Designing unique and immersive websites for forward-thinking company'
        }
      >
        {isFrench ? (
          <span ref={mobileTitleRef} className="block md:hidden">
            <span>Conception de </span>
            <span className="text-blue">sites web</span>
            <span className="text-blue">uniques </span>
            <span>et </span>
            <span className="text-blue">immersifs</span>
            <span> pour les entreprises avant-gardistes</span>
          </span>
        ) : (
          <span ref={mobileTitleRef} className="block md:hidden">
            <span>Designing </span>
            <span className="text-blue">unique</span>
            <span> and </span>
            <span className="text-blue">immersive</span>
            <span> websites for </span>
            <span className="text-blue">forward-thinking</span>
            <span> company</span>
          </span>
        )}
        {isFrench ? (
          <span className="hidden md:block">
            <div className="relative">
              <IconCross
                className="absolute -top-10 -right-10 hidden md:block"
                color={COLORS.BLUE}
              />
              <span ref={desktopSpan1Ref} className="relative block text-left whitespace-nowrap">
                <span>
                  <span>Conception de </span>
                  <span className="text-blue">sites web</span>
                </span>
              </span>
            </div>
            <div className="relative">
              <IconCross
                className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
                color={COLORS.BLUE}
              />
              <span ref={desktopSpan2Ref} className="relative block text-right whitespace-nowrap">
                <span>
                  <span className="text-blue">uniques </span>
                  <span>et </span>
                  <span className="text-blue">immersifs</span>
                </span>
              </span>
            </div>
            <div className="relative">
              <span ref={desktopSpan3Ref} className="relative block text-left whitespace-nowrap">
                <span>pour les entreprises</span>
              </span>
            </div>
            <div className="relative">
              <IconCross
                className="absolute -right-10 -bottom-10 hidden md:block"
                color={COLORS.BLUE}
              />
              <span ref={desktopSpan4Ref} className="relative block text-center whitespace-nowrap">
                <span className="text-blue">avant-gardistes</span>
              </span>
            </div>
          </span>
        ) : (
          <span className="hidden md:block">
            <div className="relative">
              <IconCross
                className="absolute -top-10 -right-10 hidden md:block"
                color={COLORS.BLUE}
              />
              <span ref={desktopSpan1Ref} className="relative block text-left whitespace-nowrap">
                <span>
                  <span>Designing </span>
                  <span className="text-blue">unique </span>
                  <span>and </span>
                </span>
              </span>
            </div>
            <div className="relative">
              <IconCross
                className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
                color={COLORS.BLUE}
              />
              <span ref={desktopSpan2Ref} className="relative block text-right whitespace-nowrap">
                <span>
                  <span className="text-blue">immersive</span>
                  <span> websites</span>
                </span>
              </span>
            </div>
            <div className="relative">
              <IconCross
                className="absolute -right-10 -bottom-10 hidden md:block"
                color={COLORS.BLUE}
              />
              <span ref={desktopSpan3Ref} className="relative block text-left whitespace-nowrap">
                <span>
                  <span>for </span>
                  <span className="text-blue">forward-thinking </span>
                </span>
              </span>
            </div>
            <div className="relative"></div>
            <span ref={desktopSpan4Ref} className="relative block text-center whitespace-nowrap">
              <span>company</span>
            </span>
          </span>
        )}
      </h1>
      <div className="pt-y-default flex gap-4">
        <Button color="secondary" href={getInternalPath('/contact')} scroll={false}>
          {isFrench ? <span>CONTACT</span> : <span>CONTACT</span>}
        </Button>
        <Button color="primary" href={getInternalPath('/offers')} scroll={false}>
          {isFrench ? <span>OFFRES</span> : <span>OFFERS</span>}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
