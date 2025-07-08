import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { EXPERTISES } from '../../../constants/expertise.constant';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISES_CATEGORIES = EXPERTISES.map((category) => category.category);
const EXPERTISES_ITEMS = EXPERTISES.flatMap((category) => category.items.map((item) => item));

const EXPERTISES_CATEGORIES_BOUNDARIES = EXPERTISES.reduce((acc: number[], cat, idx) => {
  const prev = acc[idx - 1] || 0;
  acc.push(prev + cat.items.length);
  return acc;
}, []);

const ExpertiseDesktop = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const wrapperLineRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const labelsRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    if (!itemsRef.current || !labelsRef.current) return;

    gsap.set(itemsRef.current.children, {
      xPercent: 100,
      display: 'inline-block',
    });

    gsap.set(labelsRef.current.children, {
      xPercent: -100,
      display: 'inline-block',
    });

    gsap.set(lineRef.current, {
      scaleX: 0,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: itemsRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
      })
      .to([labelsRef.current.children, itemsRef.current.children], {
        xPercent: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      })
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 1,
          ease: 'power4.out',
        },
        '-=1.5',
      );
  });

  useGSAP(() => {
    gsap.set(wrapperLineRef.current, { yPercent: 0 });
    gsap.set(imageRef.current, { yPercent: -10 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: true,
          onUpdate: (self) => {
            const { progress } = self;
            const rightItemCount = EXPERTISES_ITEMS.length;
            const rightCurrentIndex = Math.floor(progress * rightItemCount);
            const rightClampedIndex = Math.min(Math.max(rightCurrentIndex, 0), rightItemCount - 1);
            setActiveIndex(rightClampedIndex);
          },
        },
      })
      .to(wrapperLineRef.current, {
        yPercent: 100,
        ease: 'none',
      })
      .to(
        imageRef.current,
        {
          yPercent: -90,
          ease: 'none',
        },
        '<',
      );

    revealAnimation();
  }, []);

  const getLeftActiveIndex = (activeIdx: number) => {
    for (let i = 0; i < EXPERTISES_CATEGORIES_BOUNDARIES.length; i++) {
      if (activeIdx < EXPERTISES_CATEGORIES_BOUNDARIES[i]) return i;
    }
    return EXPERTISES_CATEGORIES_BOUNDARIES.length - 1;
  };
  const leftActiveIndex = getLeftActiveIndex(activeIndex);

  const itemCount = EXPERTISES_CATEGORIES.length;
  const translateY = itemCount > 1 ? (leftActiveIndex / (itemCount - 1)) * 100 : 0;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div className="relative h-[calc(100%-100px)] w-full">
        <div className="absolute z-0 flex h-full w-full py-7">
          <div ref={wrapperLineRef} className="relative w-full">
            <ul
              ref={labelsRef}
              className="z-10 flex h-fit flex-col transition-[transform] duration-150 ease-linear"
              style={{ transform: `translateY(-${translateY}%)` }}
            >
              {EXPERTISES_CATEGORIES.map((label, index) => (
                <li key={label.fr} className={clsx('p1 relative z-10 w-fit bg-black py-3')}>
                  <span
                    className={clsx(
                      'relative z-20 inline-block bg-black pr-4 transition-transform duration-300',
                      'after:absolute after:-bottom-5 after:left-0 after:h-3 after:w-full after:bg-black after:content-[""]',
                      'pr-4 before:absolute before:-top-5 before:left-0 before:h-3 before:w-full before:bg-black before:content-[""]',
                      index === leftActiveIndex ? 'translate-x-4 text-white' : 'text-white-30',
                      index === 0 && '-translate-y-6',
                      index === 2 && 'translate-y-6',
                    )}
                  >
                    {label[isFrench ? 'fr' : 'en']}
                  </span>
                </li>
              ))}
            </ul>
            <div className="absolute inset-0 top-0 z-50 hidden h-auto w-1/3 xl:left-1/2 xl:block xl:-translate-x-1/3">
              <div ref={imageRef} className="absolute h-96 w-full bg-black">
                {EXPERTISES.map((expertise, index) => (
                  <Image
                    key={expertise.category.fr}
                    alt="background"
                    height={2160}
                    src={expertise.category.img}
                    width={3840}
                    className={clsx(
                      'absolute top-0 left-0 h-96 w-full rounded-3xl object-cover transition-opacity duration-500',
                      index !== leftActiveIndex && 'opacity-0',
                    )}
                  />
                ))}
              </div>
            </div>
            <div
              ref={lineRef}
              className="absolute top-0 left-1/2 -z-10 h-px w-[calc(100%-40px)] origin-left -translate-x-1/2 bg-white"
            />
          </div>
        </div>
        <div>
          <ul
            ref={itemsRef}
            className="text-white-30 flex min-w-[200px] flex-col items-end overflow-hidden text-right"
          >
            {EXPERTISES_ITEMS.map((item, index) => (
              <li
                key={item.fr}
                className={clsx(
                  'p2 relative w-fit bg-black py-3 whitespace-nowrap',
                  'after:absolute after:-bottom-1 after:left-0 after:h-2 after:w-full after:bg-black after:content-[""]',
                  'pl-4 before:absolute before:-top-1 before:left-0 before:h-2 before:w-full before:bg-black before:content-[""]',
                )}
              >
                <span
                  className={clsx(
                    'z-10 inline-block bg-black pl-4 transition-transform duration-300',

                    index === activeIndex ? 'text-yellow -translate-x-4' : 'text-white-30',
                  )}
                >
                  {item[isFrench ? 'fr' : 'en']}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseDesktop;
