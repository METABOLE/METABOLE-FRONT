import { IconLink } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { TeamMember } from '@/types/us.type';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject } from 'react';

gsap.registerPlugin(SplitText);

interface CardUsProps {
  member: TeamMember;
  index: number;
  wrapperImagesRefs: RefObject<HTMLDivElement | null>;
  imagesRefs: RefObject<HTMLImageElement | null>;
}

const CardUs = ({ member, index, wrapperImagesRefs, imagesRefs }: CardUsProps) => {
  const { isFrench } = useLanguage();

  return (
    <div
      ref={wrapperImagesRefs}
      className={clsx(
        'relative h-[50vh] flex-1 overflow-hidden rounded-3xl lg:h-[80vh]',
        index === 1 && 'md:translate-y-[var(--y-default)]',
      )}
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
      </div>
    </div>
  );
};

export default CardUs;
