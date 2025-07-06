import { IconCross } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const imageRef = useRef(null);

  const { isFrench } = useLanguage();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      titleRefs.map((ref) => ref.current),
      {
        xPercent: (index) => (index % 2 === 0 ? 110 : -110),
        stagger: 0.2,
        ease: 'power2.inOut',
        duration: 2,
      },
      0,
    );

    tl.to(
      imageRef.current,
      {
        scale: 1,
        duration: 2,
        ease: 'power2.inOut',
      },
      '-=1.7',
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-y-double-default px-x-default pb-y-default gap-y-default relative flex min-h-screen flex-col justify-center"
    >
      <div className="relative">
        <h1 ref={titleRefs[0]} className="text-left text-[50px] leading-loose md:!text-[90px]">
          {isFrench ? 'INNOVER' : 'INNOVATE'}
        </h1>
        <IconCross
          className="absolute -top-10 -right-10 hidden -translate-y-1/2 md:block"
          color={COLORS.BLUE}
        />
      </div>
      <div className="relative">
        <h1
          ref={titleRefs[1]}
          className="text-blue text-right text-[50px] leading-loose md:!text-[90px]"
        >
          {isFrench ? 'DESIGNER' : 'DESIGNER'}
        </h1>
        <IconCross
          className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
          color={COLORS.BLACK}
        />
      </div>
      <div className="relative">
        <h1 ref={titleRefs[2]} className="pl-[15vw] text-[50px] leading-loose md:!text-[90px]">
          {isFrench ? 'CRÉER' : 'CREATE'}
        </h1>
        <IconCross
          className="absolute top-1/2 right-1/4 hidden -translate-y-1/2 md:block"
          color={COLORS.BLUE}
        />
      </div>
      <div className="relative">
        <h1
          ref={titleRefs[3]}
          className="text-blue pr-[25vw] text-right text-[50px] leading-loose md:!text-[90px]"
        >
          {isFrench ? 'SUBLIMER' : 'SUBLIMATE'}
        </h1>
        <IconCross className="absolute -right-10 -bottom-10 hidden md:block" color={COLORS.BLACK} />
      </div>
      <div
        ref={imageRef}
        className="px-x-default pt-y-double-default pb-y-default absolute top-0 left-0 h-screen w-screen scale-0"
      >
        <Image
          alt="Matteo and Jerome"
          className="h-full w-full rounded-3xl object-cover object-top"
          height={1920}
          src="/images/matteo-and-jerome.png"
          width={1080}
        />
      </div>
    </section>
  );
};

export default Hero;
