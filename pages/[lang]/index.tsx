import Div3D from '@/components/Text3D';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Home() {
  const { isFrench } = useLanguage();
  const { isProd } = useEnvironment();
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

    const allAnimElements = titleRef.current.querySelectorAll('span');

    allAnimElements.forEach((element) => {
      if (element.classList.contains('anim-x')) {
        gsap.set(element, {
          x: 100,
          opacity: 0,
        });
      } else if (element.classList.contains('anim-y')) {
        gsap.set(element, {
          y: 100,
          opacity: 0,
        });
      }
    });

    gsap.set(createdByRef.current.children, {
      y: 50,
      opacity: 0,
    });

    gsap
      .timeline({
        delay: isProd ? 4 : 0.4,
        defaults: {
          ease: 'power2.out',
          duration: 0.8,
          opacity: 1,
        },
      })
      .to(allAnimElements, {
        x: 0,
        y: 0,
        stagger: 0.1,
      })
      .to(
        createdByRef.current.children,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
        },
        '+=0.4',
      )
      .set(createdByRef.current, {
        overflow: 'visible',
      })
      .play();
  }, []);

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col">
      <section
        ref={textRef}
        className="px-x-default flex h-full w-full flex-col justify-center text-left md:text-center"
      >
        <Div3D className="text-left whitespace-pre-wrap md:text-center" intensity={3}>
          {isFrench ? (
            <h1 ref={titleRef} className="animated-text">
              <span className="anim-x">Studio </span>
              <span className="anim-x">créatif </span>
              <span className="anim-x">qui </span>
              <span className="anim-x">concoit </span>
              <span className="anim-x">des </span>
              <span className="anim-y text-blue">expériences </span>
              <span className="anim-y text-blue">web </span>
              <span className="anim-x">uniques </span>
              <span className="anim-x">et </span>
              <span className="anim-x">immersives </span>
              <span className="anim-x">pour </span>
              <span className="anim-x">les </span>
              <span className="anim-y text-blue">entreprises </span>
              <span className="anim-y text-blue">avant-</span>
              <span className="anim-y text-blue">gardistes.</span>
            </h1>
          ) : (
            <h1 ref={titleRef} className="animated-text">
              <span className="anim-x">Creative </span>
              <span className="anim-x">studio </span>
              <span className="anim-x">that </span>
              <span className="anim-x">builds </span>
              <span className="anim-y text-blue">unique </span>
              <span className="anim-y text-blue">and </span>
              <span className="anim-y text-blue">immersive </span>
              <span className="anim-x">web </span>
              <span className="anim-x">experiences </span>
              <span className="anim-x">for </span>
              <span className="anim-y text-blue">forward-</span>
              <span className="anim-y text-blue">thinking </span>
              <span className="anim-y text-blue">companies. </span>
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

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: 'en' } }, { params: { lang: 'fr' } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
