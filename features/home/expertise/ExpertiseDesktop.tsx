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
  const lineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { isFrench } = useLanguage();

  useGSAP(() => {
    gsap.set(lineRef.current, { yPercent: 0 });
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
      .to(lineRef.current, {
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
          <div ref={lineRef} className="relative w-full">
            <div
              className="z-10 flex h-fit flex-col transition-[transform] duration-150 ease-linear"
              style={{ transform: `translateY(-${translateY}%)` }}
            >
              {EXPERTISES_CATEGORIES.map((label, index) => (
                <span
                  key={label.fr}
                  className={clsx(
                    'p1 relative z-10 w-fit bg-black py-3 pr-4 transition-[colors,translate] duration-300',
                    'after:absolute after:-bottom-5 after:left-0 after:h-6 after:w-full after:bg-black after:content-[""]',
                    'before:absolute before:-top-5 before:left-0 before:h-6 before:w-full before:bg-black before:content-[""]',
                    index === leftActiveIndex ? 'translate-x-4 text-white' : 'text-white-30',
                    index === 0 && '-translate-y-6',
                    index === 2 && 'translate-y-6',
                  )}
                >
                  {label[isFrench ? 'fr' : 'en']}
                </span>
              ))}
            </div>
            <div className="absolute inset-0 top-0 z-50 hidden h-auto w-1/3 xl:left-1/2 xl:block xl:-translate-x-1/3">
              <Image
                ref={imageRef}
                alt="background"
                className="h-auto w-full rounded-3xl object-cover"
                height={2160}
                src="/images/placeholder.png"
                width={3840}
              />
            </div>
            <div className="absolute top-0 left-1/2 -z-10 h-px w-[calc(100%-40px)] -translate-x-1/2 bg-white" />
          </div>
        </div>
        <div>
          <ul className="text-white-30 flex min-w-[200px] flex-col items-end text-right">
            {EXPERTISES_ITEMS.map((item, index) => (
              <li
                key={item.fr}
                className={clsx(
                  'p2 relative w-fit bg-black py-3 pl-4 whitespace-nowrap transition-[colors,translate] duration-300',
                  'after:absolute after:-bottom-1 after:left-0 after:h-2 after:w-full after:bg-black after:content-[""]',
                  'before:absolute before:-top-1 before:left-0 before:h-2 before:w-full before:bg-black before:content-[""]',
                  index === activeIndex ? 'text-yellow -translate-x-4' : 'text-white-30',
                )}
              >
                {item[isFrench ? 'fr' : 'en']}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseDesktop;
