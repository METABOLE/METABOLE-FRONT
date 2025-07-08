import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import { TEAM_MEMBERS } from '@/constants/us.constant';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import CardUs from './CardUs';
import FloatingHalo from '@/components/shared/FloatingHalo';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Us = ({ isPageTeam = false }: { isPageTeam?: boolean }) => {
  const sectionRef = useRef(null);
  const wrapperImagesRefs = [useRef(null), useRef(null)];
  const imagesRefs = [useRef(null), useRef(null)];
  const titleRef = useRef(null);

  const { isFrench, getInternalPath } = useLanguage();
  const { locale } = useRouter();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    const splitTitle = new SplitText(titleRef.current, {
      type: 'chars',
      mask: 'chars',
    });

    gsap.set(splitTitle.chars, {
      yPercent: 100,
    });

    gsap.to(splitTitle.chars, {
      yPercent: 0,
      duration: 1,
      stagger: 0.01,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 75%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  const scrollAnimation = contextSafe(() => {
    gsap.set(wrapperImagesRefs[0].current, { y: 150 });
    gsap.set(wrapperImagesRefs[1].current, { y: 400 });
    gsap.set(imagesRefs[0].current, { y: -200 });
    gsap.set(imagesRefs[1].current, { y: -200 });

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
      .to(wrapperImagesRefs[0].current, {
        y: -50,
        ease: 'none',
      })
      .to(
        wrapperImagesRefs[1].current,
        {
          y: 0,
          ease: 'none',
        },
        '<',
      )
      .to(
        imagesRefs[0].current,
        {
          y: 0,
          ease: 'none',
        },
        '<',
      )
      .to(
        imagesRefs[1].current,
        {
          y: 0,
          ease: 'none',
        },
        '<',
      );
  });

  useGSAP(() => {
    ScrollTrigger.getById('team-parallax')?.kill();

    if (isMobile) {
      gsap.set(wrapperImagesRefs[0].current, { y: 0 });
      gsap.set(wrapperImagesRefs[1].current, { y: 0 });
      gsap.set(imagesRefs[0].current, { y: 0 });
      gsap.set(imagesRefs[1].current, { y: 0 });
      return;
    }

    scrollAnimation();
  }, [isMobile]);

  useGSAP(() => {
    if (titleRef.current) gsap.killTweensOf(titleRef.current);
    revealAnimation();
  }, [isFrench, locale]);

  return (
    <section
      ref={sectionRef}
      className="px-x-default py-y-double-default gap-y-y-default relative flex flex-col items-center"
    >
      <FloatingHalo
        className="pointer-events-none absolute top-2/3 left-full -z-10 h-[150vw] w-[150vw] opacity-40"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      <h1 ref={titleRef} className="relative w-fit text-center whitespace-nowrap">
        {isFrench ? <span>NOS FONDATEURS</span> : <span>OUR FOUNDERS</span>}
        <IconCross className="absolute -right-10 bottom-0 hidden md:block" color={COLORS.BLACK} />
      </h1>
      <div className="lg:px-x-default relative flex flex-col gap-5 md:flex-row md:pb-[200px]">
        <IconCross
          className="left-x-default absolute -bottom-20 hidden md:block"
          color={COLORS.BLUE}
        />
        {TEAM_MEMBERS.map((member, index) => (
          <CardUs
            key={member.name}
            imagesRefs={imagesRefs[index]}
            index={index}
            member={member}
            wrapperImagesRefs={wrapperImagesRefs[index]}
          />
        ))}
      </div>
      {!isPageTeam && (
        <Button href={getInternalPath('/team')}>{isFrench ? 'Notre équipe' : 'Our team'}</Button>
      )}
    </section>
  );
};

export default Us;
