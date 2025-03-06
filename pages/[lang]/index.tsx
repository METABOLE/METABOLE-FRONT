import Div3D from '@/components/Text3D';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Home() {
  const { isFrench } = useLanguage();
  const { x, y } = useMousePosition();

  const textRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const createdByRef = useRef<HTMLHeadingElement>(null);

  gsap.to(textRef.current, {
    duration: 0.8,
    y: -y / 90,
    x: -x / 90,
    ease: 'power2.out',
  });

  useGSAP(() => {
    if (!titleRef.current || !createdByRef.current) return;

    const { children } = titleRef.current;

    gsap.set([children[0], children[1], children[3]], {
      x: 100,
      opacity: 0,
    });
    gsap.set([children[2], children[4]], {
      y: 100,
      opacity: 0,
    });
    gsap.set(createdByRef.current.children, {
      y: 50,
    });

    gsap
      .timeline({
        delay: 1,
        defaults: {
          ease: 'power2.out',
          opacity: 1,
        },
      })
      .to(children[0], {
        x: 0,
        y: 0,
        duration: 0.4,
      })
      .to(
        children[1],
        {
          x: 0,
          y: 0,
          duration: 0.6,
        },
        '-=0.2',
      )
      .to(
        children[2],
        {
          x: 0,
          y: 0,
          duration: 0.8,
        },
        '-=0.4',
      )
      .to(
        children[3],
        {
          x: 0,
          y: 0,
          duration: 1,
        },
        '-=0.6',
      )
      .to(
        children[4],
        {
          x: 0,
          y: 0,
          duration: 1.2,
        },
        '-=0.8',
      )
      .to(
        createdByRef.current.children,
        {
          y: 0,
          duration: 1.2,
          stagger: 0.05,
        },
        '-=1',
      )
      .play();
  }, [isFrench]);

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col">
      <section
        ref={textRef}
        className="px-x-default flex h-full w-full flex-col justify-center text-left md:text-center"
      >
        <Div3D className="text-left whitespace-pre-wrap md:text-center" intensity={3}>
          {isFrench ? (
            <h1 ref={titleRef} className="animated-text">
              <span>Studio créatif</span>
              <span> qui concoit des</span>
              <strong className="text-blue font-normal">expériences web</strong>
              <span> uniques et immersives pour les </span>
              <strong className="text-blue font-normal">entreprises avant-gardistes.</strong>
            </h1>
          ) : (
            <h1 ref={titleRef} className="animated-text">
              <span>Creative studio </span>
              <span>that builds </span>
              <strong className="text-blue font-normal">unique and immersive</strong>
              <span> web experiences for </span>
              <strong className="text-blue font-normal">forward-thinking companies.</strong>
            </h1>
          )}
          <p ref={createdByRef} className="animated-text mt-10 overflow-hidden whitespace-pre-wrap">
            <span>{isFrench ? 'Par ' : 'By '}</span>
            <a
              className="text-blue group relative"
              href="https://www.matteocourquin.com/"
              target="_blank"
            >
              Matteo Courquin
              <span className="absolute bottom-8 left-1/2 h-auto w-36 origin-bottom -translate-x-1/2 scale-0 rotate-0 transition-transform duration-300 group-hover:scale-100 group-hover:-rotate-6">
                <img
                  alt=""
                  className="animation-float h-full w-full object-contain"
                  src="/images/matteo.png"
                />
              </span>
            </a>
            <span> & </span>
            <a
              className="text-blue group relative"
              href="https://www.jeromebezeau.com/"
              target="_blank"
            >
              Jérôme Bezeau
              <span className="absolute bottom-8 left-1/2 h-auto w-36 origin-bottom -translate-x-1/2 scale-0 rotate-0 transition-transform duration-300 group-hover:scale-100 group-hover:rotate-6">
                <img
                  alt=""
                  className="animation-float h-full w-full object-contain"
                  src="/images/jerome.png"
                />
              </span>
            </a>
          </p>
        </Div3D>
      </section>
    </div>
  );
}
