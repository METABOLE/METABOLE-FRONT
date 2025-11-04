import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import { EXPERTISES } from '@/constants/expertise.constant';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import ExpertiseItem from './ExpertiseItem';

gsap.registerPlugin(SplitText);

const Expertise = ({ isPageServices = false }: { isPageServices?: boolean }) => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const imageRefs = {
    wrapper: {
      first: useRef(null),
      second: useRef(null),
    },
    images: useRef<HTMLDivElement[]>([]),
  };

  const { isFrench, getInternalPath } = useLanguage();
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

  const scrubAnimation = contextSafe(() => {
    if (!sectionRef.current) return;

    gsap.set(imageRefs.images.current.slice(1), {
      clipPath: 'inset(100% 0 0 0)',
    });
    gsap.set(imageRefs.images.current[0], {
      clipPath: 'inset(0% 0 0 0)',
    });
    gsap.set(imageRefs.wrapper.first.current, {
      opacity: 0,
    });
    gsap.set(imageRefs.wrapper.second.current, {
      width: 0,
      height: 0,
    });

    const totalDuration = 100;
    const numberOfTransitions = EXPERTISES.length - 1;
    const singleTransitionDuration = totalDuration / numberOfTransitions;

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
      .to(
        [imageRefs.wrapper.first.current, imageRefs.wrapper.second.current],
        {
          yPercent: (index) => (index % 2 === 0 ? 100 : -100),
          duration: totalDuration,
          ease: 'none',
        },
        0,
      )
      .to(
        imageRefs.wrapper.first.current,
        {
          opacity: 1,
          duration: 1,
        },
        0,
      )
      .to(
        imageRefs.wrapper.second.current,
        {
          width: '20vw',
          height: '15vw',
          maxWidth: '400px',
          maxHeight: '300px',
          duration: 10,
          ease: 'power1.out',
        },
        0,
      );

    imageRefs.images.current.forEach((image, index) => {
      if (index === 0) return;

      const startTime = (index - 1) * singleTransitionDuration;

      tl.to(
        imageRefs.images.current[index - 1],
        {
          clipPath: 'inset(0 0 100% 0)',
          ease: 'none',
          duration: singleTransitionDuration,
        },
        startTime,
      );
      tl.to(
        image,
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          duration: singleTransitionDuration,
        },
        startTime,
      );
    });
  });

  useGSAP(() => {
    revealAnimation();
    scrubAnimation();
  }, [isFrench]);

  return (
    <section ref={sectionRef} className="px-x-default py-y-double-default relative flex flex-col">
      <h1 ref={titleRef} className="pb-y-default relative w-fit text-black">
        {isFrench ? <span>NOS EXPERTISES</span> : <span>OUR EXPERTISES</span>}
        <IconCross className="absolute -right-10 bottom-0 hidden md:block" color={COLORS.WHITE} />
      </h1>
      <div className="gap-y-y-default relative flex flex-col">
        <div
          ref={imageRefs.wrapper.first}
          className="absolute right-0 bottom-0 hidden h-full w-fit object-right-top lg:block"
        >
          <div
            ref={imageRefs.wrapper.second}
            className="flex h-[15vw] max-h-[300px] w-[20vw] max-w-[400px] items-start justify-end overflow-hidden rounded-xl"
          >
            {EXPERTISES.map((expertise, index) => (
              <div
                key={expertise.category.fr}
                ref={(el) => {
                  if (!el) return;
                  imageRefs.images.current[index] = el;
                }}
                className="absolute top-0 right-0 h-[15vw] max-h-[300px] w-[20vw] max-w-[400px]"
              >
                <img
                  alt={expertise.category.fr}
                  className="h-full w-full object-cover"
                  src={expertise.category.img}
                />
              </div>
            ))}
          </div>
        </div>
        {EXPERTISES.map((expertise, index) => (
          <ExpertiseItem key={expertise.category.fr} expertise={expertise} index={index} />
        ))}
      </div>
      {!isPageServices && (
        <div className="pt-y-default">
          <Button
            className="z-30"
            color="primary"
            href={getInternalPath('/services')}
            scroll={false}
          >
            {isFrench ? 'NOS SERVICES' : 'OUR SERVICES'}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Expertise;
