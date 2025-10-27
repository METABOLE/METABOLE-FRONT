import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const Index = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const playOne = () => {
    gsap.fromTo(
      firstRef.current,
      {
        left: -100,
      },
      {
        left: 100,
        delay: 2,
        duration: 1,
        ease: 'power2.inOut',
      },
    );
  };

  const playTwo = () => {
    gsap.fromTo(
      secondRef.current,
      {
        x: -100,
      },
      {
        x: 100,
        delay: 2,
        duration: 1,
        ease: 'power2.inOut',
      },
    );
  };

  const timelineAnimation = contextSafe(() => {
    playOne();
    playTwo();
  });

  // useGSAP(() => {
  //   timelineAnimation();
  // });

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <div className="relative h-32 w-32">
        <div ref={firstRef} className="bg-blue absolute h-32 w-32 rounded-lg"></div>
      </div>
      <div className="relative h-32 w-32">
        <div ref={secondRef} className="bg-blue h-32 w-32 rounded-lg"></div>
      </div>

      <div className="flex gap-5 pt-20">
        <button onClick={() => timelineAnimation()}>Play</button>
        <button onClick={() => playOne()}>Play One</button>
        <button onClick={() => playTwo()}>Play Two</button>
      </div>
    </section>
  );
};

export default Index;
