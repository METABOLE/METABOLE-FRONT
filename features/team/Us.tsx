import { IconLink } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { TEAM_MEMBERS } from '@/constants/us.constant';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const Us = () => {
  const sectionRef = useRef(null);
  const imagesRefs = [useRef(null), useRef(null)];

  const { isFrench } = useLanguage();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  useGSAP(() => {
    ScrollTrigger.getById('team-parallax')?.kill();

    if (isMobile) {
      gsap.set(imagesRefs[0].current, { y: 0 });
      gsap.set(imagesRefs[1].current, { y: 0 });
      return;
    }

    gsap
      .timeline({
        scrollTrigger: {
          id: 'team-parallax',
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      .fromTo(
        imagesRefs[0].current,
        {
          y: 150,
        },
        {
          y: -50,
        },
        '<',
      )
      .fromTo(
        imagesRefs[1].current,
        {
          y: 400,
        },
        {
          y: 0,
        },
        '<',
      );
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="px-x-default py-y-double-default">
      <h1 className="pb-y-default text-center">
        {isFrench ? 'JUSTE LES DEUX DESSOUS' : 'JUST THE TWO OF US'}
      </h1>
      <div className="lg:px-x-default flex flex-col gap-5 md:flex-row">
        {TEAM_MEMBERS.map((member, index) => (
          <div
            key={member.name}
            ref={imagesRefs[index]}
            className={clsx(
              'group/image relative flex-1 overflow-hidden rounded-3xl',
              index === 1 && 'md:translate-y-[var(--y-default)]',
            )}
          >
            <Link
              className="ease-power4-in-out absolute top-3.5 right-3.5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white transition-transform duration-300 hover:scale-90"
              href={member.website}
              target="_blank"
            >
              <IconLink />
            </Link>
            <Image
              alt={member.alt}
              className="ease-power4-in-out transition-transform duration-700 group-hover/image:scale-105"
              height={1920}
              src={member.image}
              width={1080}
            />
            <div className="absolute right-3.5 bottom-3.5 left-3.5 flex h-[77px] flex-col justify-between rounded-2xl bg-white p-4">
              <h2 className="text-blue p2">{member.name}</h2>
              <p className="p3 text-black">{isFrench ? member.role.fr : member.role.en}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Us;
