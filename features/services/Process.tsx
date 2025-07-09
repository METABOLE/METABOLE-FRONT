import FloatingHalo from '@/components/shared/FloatingHalo';
import {
  IconCross,
  IconDelivery,
  IconDesign,
  IconDevelopment,
  IconFixing,
  IconIdeation,
  IconInitialExchange,
} from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import Divider from './timeline/Divider';
import Event from './timeline/Event';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Process = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const wrapperLineRef = useRef(null);
  const lineRef = useRef(null);
  const progressBarRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { isFrench } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { contextSafe } = useGSAP();

  const scrubAnimation = contextSafe(() => {
    if (!sectionRef.current || !horizontalRef.current || !progressBarRef.current) return;

    const scrollDistance = horizontalRef.current.scrollWidth - window.innerWidth;

    gsap.to(horizontalRef.current, {
      x: () => `-${scrollDistance}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.set(wrapperLineRef.current, {
      xPercent: -7,
    });

    gsap.set(lineRef.current, {
      opacity: 0,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: true,
          onUpdate: (self) => {
            const { progress } = self;
            let opacity = 0;

            if (progress >= 0.2 && progress <= 0.8) {
              opacity = 1;
            } else if (progress < 0.2) {
              opacity = progress / 0.2;
            } else if (progress > 0.8) {
              opacity = 1 - (progress - 0.8) / 0.2;
            }

            gsap.to(lineRef.current, {
              opacity: opacity,
              ease: 'none',
              duration: 0,
            });
          },
        },
      })
      .to(
        progressBarRef.current,
        {
          width: '100%',
          ease: 'none',
        },
        '<',
      )
      .to(
        wrapperLineRef.current,
        {
          xPercent: 100,
          ease: 'none',
        },
        '<',
      );
  });

  const revealAnimation = contextSafe(() => {
    const splitTitle = new SplitText(titleRef.current, {
      type: 'chars',
      mask: 'chars',
    });
    const splitDescription = new SplitText(descriptionRef.current, {
      type: 'words',
    });

    gsap.set(splitTitle.chars, {
      yPercent: 100,
    });

    gsap.set(splitDescription.words, {
      yPercent: 100,
      opacity: 0,
      filter: 'blur(10px)',
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
      })
      .to(splitTitle.chars, {
        yPercent: 0,
        duration: 1,
        stagger: 0.01,
        ease: 'power4.out',
      })
      .to(
        splitDescription.words,
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.005,
          ease: 'power4.out',
        },
        '-=0.8',
      );
  });

  useGSAP(() => {
    revealAnimation();
  }, [isFrench]);

  useGSAP(() => {
    scrubAnimation();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-x-default relative flex h-screen w-full flex-col overflow-hidden bg-black"
      id="process"
    >
      <div className="gap-x-x-default pb-y-default pt-y-double-default flex items-center">
        <h1 ref={titleRef} className="relative w-fit whitespace-nowrap text-white">
          {isFrench ? 'PROCESSUS' : 'PROCESS'}
          <IconCross className="absolute -right-10 bottom-0 hidden md:block" color={COLORS.WHITE} />
        </h1>
        <div className="relative h-0.5 w-[35vw] max-w-[489px] bg-[#C5C4FF]/30">
          <div ref={progressBarRef} className="bg-yellow absolute h-0.5 w-0">
            <svg
              className="absolute -top-[3px] -right-3"
              fill="none"
              height="8"
              viewBox="0 0 8 8"
              width="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 4L8 4" stroke="#CAEE17" strokeWidth="2" />
              <path d="M4 0L4 8" stroke="#CAEE17" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div ref={horizontalRef} className="flex h-full w-fit flex-row items-start md:items-end">
        <div className="py-y-default flex flex-col justify-between bg-black">
          <div className="gap-x-x-default pr-x-default grid grid-cols-[70vw_1fr] md:grid-cols-[40vw_1fr]">
            <p ref={descriptionRef} className="p2 pr-x-default text-white-70 z-50 row-span-8">
              {isFrench ? (
                <>
                  <span>
                    Notre méthodologie est structurée pour garantir rigueur, clarté et excellence à
                    chaque étape du projet.
                  </span>
                  <br />
                  <br />
                  <span>
                    Elle articule conception, design et développement sur-mesure autour d'un cadre
                    collaboratif précis et maîtrisé.
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Our methodology is structured to ensure rigor, clarity and excellence at each
                    stage of the project.
                  </span>
                  <br />
                  <br />
                  <span>
                    It articulates design, design and custom development around a precise and
                    mastered collaborative framework.
                  </span>
                </>
              )}
            </p>

            <div className="relative">
              <FloatingHalo
                className="pointer-events-none absolute top-0 left-1/3 z-50 h-[200vw] w-[200vw] -translate-x-1/2 translate-y-1/2 opacity-30"
                from="#1b17ee"
                to="#14141800"
              />
              <div
                className={clsx(
                  'absolute z-0 grid h-fit text-white',
                  'grid-cols-[42px_2px_188px_2px_188px_2px_188px_2px_188px_2px_188px_2px_188px_2px_188px_2px_188px] grid-rows-[repeat(8,42px)]',
                  'md:grid-cols-[62px_2px_288px_2px_288px_2px_288px_2px_288px_2px_288px_2px_288px_2px_288px_2px_288px] md:grid-rows-[repeat(8,62px)]',
                )}
              >
                <div className="absolute top-0 left-0 z-10 h-64 w-full bg-gradient-to-b from-black to-black/0" />
                <div
                  className={clsx(
                    'absolute -bottom-0.5 left-0 z-10 h-0.5 w-5/6 bg-[#F1F2FF] opacity-50',
                    'after:absolute after:top-0 after:right-0 after:h-0.5 after:w-[288px] after:translate-x-[calc(100%-2px)] after:bg-gradient-to-r after:from-[#F1F2FF] after:to-black after:content-[""]',
                    'before:absolute before:top-0 before:left-0 before:h-0.5 before:w-[188px] before:-translate-x-[calc(100%-14px)] before:bg-gradient-to-l before:from-[#F1F2FF] before:to-black before:content-[""]',
                  )}
                />
                <div />
                <Divider className="row-span-8" />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S1</span>
                </div>
                <Divider className="row-span-8" isDashed />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S2</span>
                </div>
                <Divider className="row-span-8" isDashed />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S3</span>
                </div>
                <Divider className="row-span-8" isDashed />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S4</span>
                </div>
                <Divider className="row-span-8" />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S5</span>
                </div>
                <Divider className="row-span-8" isDashed />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S6</span>
                </div>
                <Divider className="row-span-8" isDashed />
                <div className="row-span-8 flex h-full w-full items-end">
                  <span className="translate-y-[110%] px-2">S7</span>
                </div>
              </div>
              <div
                className={clsx(
                  'relative z-10 grid h-fit gap-0.5 text-white',
                  'grid-cols-[42px_188px_188px_188px_188px_188px_188px_42px_188px_188px] grid-rows-[repeat(8,42px)]',
                  'md:grid-cols-[62px_288px_288px_288px_288px_288px_288px_62px_288px_288px_288px] md:grid-rows-[repeat(8,62px)]',
                )}
              >
                <div
                  ref={wrapperLineRef}
                  className="pointer-events-none absolute bottom-3 z-50 hidden h-[calc(100%+100px)] w-full -translate-x-full bg-black/50 md:block"
                >
                  <div ref={lineRef} className="bg-yellow absolute top-0 right-0 z-10 h-full w-0.5">
                    <svg
                      className="absolute -top-3 -right-[3px]"
                      fill="none"
                      height="8"
                      viewBox="0 0 8 8"
                      width="8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 4L8 4" stroke="#CAEE17" strokeWidth="2" />
                      <path d="M4 0L4 8" stroke="#CAEE17" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <Event
                  icon={<IconInitialExchange />}
                  label={isFrench ? 'ECHANGE INITIAL / KICK OFF' : 'INITIAL EXCHANGE / KICK OFF'}
                  className={clsx(
                    'col-start-1 col-end-2 row-start-1 transition-opacity duration-200',
                    activeIndex === null || activeIndex === 0 ? 'opacity-100' : 'opacity-40',
                  )}
                  description={
                    isFrench
                      ? 'On commence par ce premier échange pour poser les bases : vos besoins, vos envies, vos enjeux.'
                      : 'We start with this first exchange to set the bases: your needs, your wishes, your goals.'
                  }
                  isSquare
                  onMouseEnter={() => setActiveIndex(0)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                <div />
                <Event
                  duration="1 sem"
                  icon={<IconIdeation />}
                  label="IDEATION"
                  className={clsx(
                    'col-start-2 col-end-3 row-start-2 transition-opacity duration-200',
                    activeIndex === null || activeIndex === 1 ? 'opacity-100' : 'opacity-40',
                  )}
                  description={
                    isFrench
                      ? 'On alimente cette phase avec de l’inspiration et les premières intentions créatives. Elle permet de valider la DA et les fondations du projet.'
                      : 'We feed this phase with inspiration and the first creative intentions. It allows to validate the DA and the foundations of the project.'
                  }
                  onMouseEnter={() => setActiveIndex(1)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                <div />
                <Event
                  duration="3 sem"
                  icon={<IconDesign />}
                  label="DESIGN"
                  className={clsx(
                    'col-start-3 col-end-6 row-start-3',
                    'after:p2 after:absolute after:top-[3px] after:right-0 after:-z-10 after:flex after:h-9 after:w-[288px] after:translate-x-[calc(100%-14px)] after:items-center after:rounded-r-xl after:bg-[#8887B0]/30 after:pl-7 after:!text-[14px] after:text-white md:after:h-14 md:after:!text-[20px]',
                    isFrench ? 'after:content-["RETOURS"]' : 'after:content-["FEEDBACKS"]',
                    'transition-opacity duration-200',
                    activeIndex === null || activeIndex === 2 ? 'opacity-100' : 'opacity-40',
                  )}
                  description={
                    isFrench
                      ? 'On conçoit une direction artistique sur-mesure. Chaque écran, chaque section du site est réalisée et prototypée pour vous donner un aperçu du résultat final.'
                      : 'We design a custom artistic direction. Each screen, each section of the site is designed and prototyped to give you an overview of the final result.'
                  }
                  onMouseEnter={() => setActiveIndex(2)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                <div />
                <Event
                  duration="3 sem"
                  icon={<IconDevelopment />}
                  label={isFrench ? 'DEVELOPPEMENT' : 'DEVELOPMENT'}
                  className={clsx(
                    'col-start-5 col-end-8 row-start-4 transition-opacity duration-200',
                    activeIndex === null || activeIndex === 3 ? 'opacity-100' : 'opacity-40',
                  )}
                  description={
                    isFrench
                      ? 'On code l’ensemble du site, avec des animations soignées et un CMS intégré pour une autonomie totale. Optimisation, responsive et performance, SEO : tout est custom pour répondre à vos besoins.'
                      : 'We code the entire site, with carefully designed animations and a CMS for total autonomy. Optimization, responsive and performance, SEO: everything is custom to meet your needs.'
                  }
                  onMouseEnter={() => setActiveIndex(3)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                <div />
                <Event
                  icon={<IconDelivery />}
                  label={isFrench ? 'VALIDATION & LIVRAISON' : 'VALIDATION & DELIVERY'}
                  className={clsx(
                    'col-start-8 col-end-9 row-start-5 transition-opacity duration-200',
                    activeIndex === null || activeIndex === 4 ? 'opacity-100' : 'opacity-40',
                  )}
                  description={
                    isFrench
                      ? 'On commence par ce premier échange pour poser les bases : vos besoins, vos envies, vos enjeux. On cadre notre mission pour répondre le plus précisément à vos problématiques.'
                      : 'We start with this first exchange to set the bases: your needs, your wishes, your goals. We frame our mission to respond as precisely as possible to your problems.'
                  }
                  isSquare
                  onMouseEnter={() => setActiveIndex(4)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                <div />
                <Event
                  icon={<IconFixing />}
                  label={isFrench ? 'ACCOMPAGNEMENT' : 'SUPPORT'}
                  className={clsx(
                    'col-start-9 col-end-10 row-start-6',
                    'after:from-blue after:absolute after:top-[3px] after:right-0 after:h-9 after:w-[288px] after:translate-x-[calc(100%-14px)] after:bg-gradient-to-r after:to-black after:content-[""] md:after:h-14',
                    'transition-opacity duration-200',
                    activeIndex === null || activeIndex === 5 ? 'opacity-100' : 'opacity-40',
                  )}
                  description={
                    isFrench
                      ? 'Après la livraison, on reste disponibles. Maintenance, évolutions, nouvelles pages ou nouvelles ambitions : on avance avec vous sur le long terme.'
                      : 'After delivery, we remain available. Maintenance, evolutions, new pages or new ambitions: we advance with you on the long term.'
                  }
                  onMouseEnter={() => setActiveIndex(5)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
