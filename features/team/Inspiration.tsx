import { IconCross } from '@/components/ui/Icons';
import ScrollingContainer from '@/components/ui/ScrollingContainer';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

const images = [
  '/images/works/work-001.png',
  '/images/works/work-002.png',
  '/images/works/work-003.png',
  '/images/works/work-004.png',
  '/images/works/work-005.png',
  '/images/works/work-006.png',
];

const Fragement = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const scrollAnimation = contextSafe(() => {
    if (!scrollContainer.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: scrollContainer.current,
          start: 'top bottom+=100vh',
          end: 'bottom top-=100vh',
          scrub: true,
        },
      })
      .to(scrollContainer.current.children, {
        xPercent: (index) => {
          if (index === 0) return -25;
          if (index === 2) return 25;
          if (index === 3) return 50;
          if (index === 4) return 15;
          if (index === 5) return 30;
          return 0;
        },
        ease: 'none',
      });
  });

  useGSAP(() => {
    scrollAnimation();
  }, []);

  return (
    <div ref={scrollContainer} className="grid h-full grid-cols-[repeat(6,40vw)]">
      {images.map((src, index) => (
        <div
          key={src + index}
          className="py-y-double-default gap-x-default grid h-screen grid-rows-2 items-center"
        >
          <div
            className={clsx(
              'h-full w-full',
              index % 2 === 0 ? 'row-start-1' : 'row-start-2',
              (index === 2 || index === 6) && 'pt-10',
              index === 3 && 'pb-10',
            )}
          >
            <Image
              alt="inspiration"
              className="h-full w-auto rounded-3xl object-cover"
              height={1080}
              src={src}
              width={1920}
            />
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <IconCross color={COLORS.BLUE} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Inspiration = () => {
  const { isFrench } = useLanguage();

  return (
    <section className="relative flex overflow-hidden">
      <ScrollingContainer className="flex h-full shrink-0" scrollSpeed={100}>
        <Fragement />
      </ScrollingContainer>
      <div className="px-x-default absolute inset-0 z-20 flex items-center justify-center mix-blend-difference grayscale">
        <h1 className="text-center text-white">
          {isFrench ? (
            <span>Créer des choses qui marquent, qui inspirent et qui ont du sens.</span>
          ) : (
            <span>Create things that mark, inspire and have meaning.</span>
          )}
        </h1>
      </div>
    </section>
  );
};

export default Inspiration;
