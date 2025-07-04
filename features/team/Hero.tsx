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
      <h1 ref={titleRefs[0]} className="transform-gpu text-left !text-[90px] leading-loose">
        INNOVER
      </h1>
      <h1
        ref={titleRefs[1]}
        className="text-blue transform-gpu text-right !text-[90px] leading-loose"
      >
        DESIGNER
      </h1>
      <h1 ref={titleRefs[2]} className="transform-gpu pl-[15vw] !text-[90px] leading-loose">
        CRÉER
      </h1>
      <h1
        ref={titleRefs[3]}
        className="text-blue transform-gpu pr-[25vw] text-right !text-[90px] leading-loose"
      >
        SUBLIMER
      </h1>
      <div
        ref={imageRef}
        className="px-x-default py-y-default absolute top-0 left-0 h-screen w-screen scale-0"
      >
        <Image
          alt="Matteo and Jerome"
          className="h-full w-full rounded-3xl object-cover"
          height={1920}
          src="/images/matteo-and-jerome.png"
          width={1080}
        />
      </div>
    </section>
  );
};

export default Hero;
