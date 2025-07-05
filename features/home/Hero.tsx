import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const { isFrench, getInternalPath } = useLanguage();

  const sectionRef = useRef(null);
  const desktopSpan1Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan2Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan3Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan4Ref = useRef<HTMLSpanElement>(null);
  const mobileTitleRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    const desktopSpans = [
      desktopSpan1Ref.current,
      desktopSpan2Ref.current,
      desktopSpan3Ref.current,
      desktopSpan4Ref.current,
    ];

    if (desktopSpans.every((span) => span)) {
      gsap.set(desktopSpans, {
        xPercent: (index) => (index % 2 === 0 ? -100 : 100),
        opacity: 0,
      });

      gsap.to(desktopSpans, {
        xPercent: 0,
        delay: 0.2,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
      });
    }

    const split = new SplitText(mobileTitleRef.current, {
      type: 'words',
    });

    gsap.set(split.words, {
      opacity: 0,
      yPercent: 100,
      filter: 'blur(10px)',
    });

    gsap.to(split.words, {
      opacity: 1,
      yPercent: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.02,
      ease: 'power4.out',
      delay: 0.5,
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
          scrub: 1,
        },
      })
      .to(desktopSpans, {
        xPercent: (index) => (index % 2 === 0 ? 20 : -20),
        display: 'inline-block',
        duration: 1.2,
        ease: 'power4.out',
      });
  });

  useGSAP(() => {
    const timeoutId = setTimeout(() => {
      scrollAnimation();
      revealAnimation();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFrench]);

  return (
    <section
      ref={sectionRef}
      className="px-x-default py-y-double-default pb-y-default flex min-h-[70vh] flex-col justify-evenly"
    >
      <h1 className="h0 uppercase">
        {isFrench ? (
          <span ref={mobileTitleRef} className="block md:hidden">
            Conception de <span className="text-blue">sites web</span>{' '}
            <span className="text-blue">uniques</span> et{' '}
            <span className="text-blue">immersifs</span> pour les entreprises avant-gardistes
          </span>
        ) : (
          <span ref={mobileTitleRef} className="block md:hidden">
            Designing <span className="text-blue">unique</span> and{' '}
            <span className="text-blue">immersive</span> websites for{' '}
            <span className="text-blue">forward-thinking</span> company
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
                  Conception de <span className="text-blue">sites web</span>
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
                  <span className="text-blue">uniques</span> et{' '}
                  <span className="text-blue">immersifs</span>{' '}
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
                  Designing <span className="text-blue">unique</span> and
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
                  <span className="text-blue">immersive</span> websites
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
                  for <span className="text-blue">forward-thinking </span>
                </span>
              </span>
            </div>
            <div className="relative"></div>
            <IconCross
              className="absolute -right-10 -bottom-10 hidden md:block"
              color={COLORS.BLUE}
            />
            <span ref={desktopSpan4Ref} className="relative block text-center whitespace-nowrap">
              <span>company</span>
            </span>
          </span>
        )}
      </h1>
      <div className="flex gap-4 pt-8">
        <Button color="secondary" href={getInternalPath('/contact')}>
          {isFrench ? 'CONTACT' : 'CONTACT'}
        </Button>
        <Button color="primary" href={getInternalPath('/pricing')}>
          {isFrench ? 'TARIFS' : 'PRICING'}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
