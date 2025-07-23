import { IconLink } from '@/components/ui/Icons';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { TeamMember } from '@/types/us.type';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject, useRef } from 'react';

gsap.registerPlugin(SplitText);

interface CardUsProps {
  member: TeamMember;
  index: number;
  wrapperImagesRefs: RefObject<HTMLDivElement | null>;
  imagesRefs: RefObject<HTMLImageElement | null>;
}

const CardUs = ({ member, index, wrapperImagesRefs, imagesRefs }: CardUsProps) => {
  const descriptionRef = useRef(null);
  const textDescriptionRef = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const { isFrench } = useLanguage();
  const { isLoading, isAtLeast } = usePerformance();
  useGSAP(() => {
    if (!descriptionRef.current || !textDescriptionRef.current || isLoading) return;

    const splitText = new SplitText(textDescriptionRef.current, {
      type: 'words',
      mask: 'lines',
    });

    const tl = gsap.timeline({ paused: true });

    gsap.set(descriptionRef.current, { height: 0 });
    gsap.set(splitText.words, {
      y: 20,
      opacity: 0,
      ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
        filter: 'blur(10px)',
      }),
    });

    tl.to(descriptionRef.current, {
      height: 'auto',
      marginTop: '16px',
      duration: 0.8,
      ease: 'power4.inOut',
    }).to(
      splitText.words,
      {
        y: 0,
        opacity: 1,
        ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
          filter: 'blur(0px)',
        }),
        stagger: 0.008,
        duration: 0.6,
        ease: 'power4.out',
      },
      '-=0.3',
    );

    timelineRef.current = tl;
  }, [isFrench, isLoading]);

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  return (
    <div
      ref={wrapperImagesRefs}
      className={clsx(
        'relative h-[50vh] flex-1 overflow-hidden rounded-3xl lg:h-[80vh]',
        index === 1 && 'md:translate-y-[var(--y-default)]',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        aria-label="Link"
        className="ease-power4-in-out absolute top-3.5 right-3.5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white transition-transform duration-300 hover:scale-90"
        href={member.website}
        target="_blank"
      >
        <IconLink />
      </Link>
      <Image
        ref={imagesRefs}
        alt={member.alt}
        className="h-[calc(100%+200px)] object-cover"
        height={1920}
        src={member.image}
        width={1080}
      />
      <div className="absolute right-3.5 bottom-3.5 left-3.5 flex h-auto flex-col justify-between rounded-2xl bg-white p-4">
        <h2 className="text-blue p2 shrink-0">{member.name}</h2>
        <p className="p3 p shrink-0 text-black">{isFrench ? member.role.fr : member.role.en}</p>
        <div ref={descriptionRef} className="overflow-hidden rounded-xl bg-black">
          <p ref={textDescriptionRef} className="p3 text-white-70 p-5 text-left">
            {isFrench ? member.description.fr : member.description.en}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardUs;
