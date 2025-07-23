import { TIMELINE } from '@/constants/timeline.constant';
import ProjectStudio from '@/features/projectStudio/ProjectStudio';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

const Pricing = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();
  const { isLoading, isAtLeast } = usePerformance();

  const revealAnimation = contextSafe(() => {
    if (!titleRef.current || !subtitleRef.current || !descriptionRef.current) return;

    const splitTitle = new SplitText(titleRef.current, {
      type: 'chars',
      mask: 'chars',
    });
    const splitSubtitle = new SplitText(subtitleRef.current, {
      type: 'words',
    });
    const splitDescription = new SplitText(descriptionRef.current, {
      type: 'words',
    });

    gsap.set(splitTitle.chars, {
      yPercent: 100,
    });
    gsap.set(splitSubtitle.words, {
      yPercent: 100,
      opacity: 0,
      ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
        filter: 'blur(10px)',
      }),
    });
    gsap.set(splitDescription.words, {
      yPercent: 100,
      opacity: 0,
      ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
        filter: 'blur(10px)',
      }),
    });

    gsap
      .timeline({
        delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION,
      })
      .to(splitTitle.chars, {
        yPercent: 0,
        duration: 1,
        stagger: 0.01,
        ease: 'power4.out',
      })
      .to(
        splitSubtitle.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
            filter: 'blur(0px)',
          }),
          stagger: 0.01,
          ease: 'power4.out',
        },
        '-=0.8',
      )
      .to(
        splitDescription.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
            filter: 'blur(0px)',
          }),
          stagger: 0.01,
          ease: 'power4.out',
        },
        '-=1',
      );
  });

  useGSAP(() => {
    if (isLoading) return;
    revealAnimation();
  }, [isFrench, isLoading]);

  return (
    <section className="px-x-default py-y-default">
      <div className="pt-y-default mx-auto w-full space-y-3 pb-14 md:text-center">
        <h1 ref={titleRef} className="text-blue">
          PROJECT STUDIO
        </h1>
        <p ref={subtitleRef} className="p1">
          {isFrench
            ? 'Partagez votre vision, nous la concrétiserons ensemble.'
            : "Share your vision, and we'll bring it to life together."}
        </p>
        <p ref={descriptionRef} className="p3 text-black-70">
          {isFrench ? (
            <>
              <span>
                Sélectionnez vos pages, votre style d'animation préféré, et vos besoins spécifiques.
              </span>
              <br />
              <span>Nous vous recontacterons rapidement pour discuter de votre projet.</span>
            </>
          ) : (
            <>
              <span>Select your pages, preferred animation style, and specific needs.</span>
              <br />
              <span>We'll get back to you quickly to discuss your project.</span>
            </>
          )}
        </p>
      </div>
      <ProjectStudio />
    </section>
  );
};

export default Pricing;
