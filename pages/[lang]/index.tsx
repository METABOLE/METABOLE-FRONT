import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import Div3D from '@/components/shared/Div3D';
import FallingCrosses from '@/components/shared/FallingCrosses';
import FloatingHalo from '@/components/shared/FloatingHalo';
import { TITLE } from '@/constants';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function Home() {
  const { isFrench } = useLanguage();
  const isScreenLoader = useIsScreenLoader();
  const { x, y } = useMousePosition();
  const { asPath } = useRouter();

  const haloRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const createdByRef = useRef<HTMLHeadingElement>(null);

  const [isAnimEnded, setIsAnimEnded] = useState(false);

  gsap.to(textRef.current, {
    duration: 0.8,
    y: -y / 90,
    x: -x / 90,
    ease: 'power2.out',
  });

  useGSAP(() => {
    if (!titleRef.current || !createdByRef.current) return;

    const allAnimElements = titleRef.current.querySelectorAll('span');

    gsap.set(allAnimElements, {
      y: (_, target) => (target.classList.contains('anim-y') ? 100 : 0),
      x: (_, target) => (target.classList.contains('anim-x') ? 100 : 0),
      opacity: 0,
    });

    gsap.set(createdByRef.current.children, {
      y: 50,
      opacity: 0,
    });

    gsap
      .timeline({
        delay: isScreenLoader ? 4.5 : 0.8,
        defaults: {
          ease: 'power2.out',
          duration: 0.8,
          opacity: 1,
        },
      })
      .to(allAnimElements, {
        y: 0,
        x: 0,
        stagger: 0.05,
      })
      .to(
        createdByRef.current.children,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
        },
        '-=0.8',
      )
      .add(() => setIsAnimEnded(true))
      .set(createdByRef.current, {
        overflow: 'visible',
      })
      .to(
        haloRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 4,
          ease: 'power4.out',
        },
        '<',
      );
  }, [isScreenLoader, isFrench]);

  return (
    <>
      <FloatingHalo
        ref={haloRef}
        className="!fixed top-[120%] -left-[90%] -z-30 h-[250vw] w-[250vw] -translate-x-full scale-50 opacity-0"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      <Head>
        <link key="canonical" href={'https://metabole.studio' + asPath} rel="canonical" />
      </Head>
      <div className="inset-0 flex h-screen w-screen flex-col">
        <section
          ref={textRef}
          className="px-x-default flex h-full w-full flex-col justify-center text-left md:text-center"
        >
          <Div3D className="text-left whitespace-pre-wrap md:text-center" intensity={3}>
            <AnimatedTitle ref={titleRef} content={isFrench ? TITLE.FR : TITLE.EN} />
            <p
              ref={createdByRef}
              className="animated-text mt-10 overflow-hidden whitespace-pre-wrap"
            >
              <span>{isFrench ? 'Par ' : 'By '}</span>
              <a
                className={clsx('text-blue relative cursor-pointer', isAnimEnded && 'group/photo')}
                href="https://matteocourquin.com/"
                target="_blank"
              >
                Matteo Courquin
                <span className="absolute bottom-8 left-1/2 h-auto w-56 origin-bottom -translate-x-1/2 scale-0 rotate-0 transition-transform duration-300 group-hover/photo:scale-100 group-hover/photo:-rotate-6">
                  <Image
                    alt="Matteo Courquin"
                    className="animation-float h-full w-full object-contain"
                    height={1080}
                    src="/images/matteo.jpg"
                    width={720}
                  />
                </span>
              </a>
              <span> & </span>
              <a
                className={clsx('text-blue relative cursor-pointer', isAnimEnded && 'group/photo')}
                href="https://jeromebezeau.com/"
                target="_blank"
              >
                Jérôme Bezeau
                <span className="absolute bottom-8 left-1/2 h-auto w-56 origin-bottom -translate-x-1/2 scale-0 rotate-0 transition-transform duration-300 group-hover/photo:scale-100 group-hover/photo:rotate-6">
                  <Image
                    alt="Jérôme Bezeau"
                    className="animation-float h-full w-full object-contain"
                    height={1080}
                    src="/images/jerome.jpg"
                    width={720}
                  />
                </span>
              </a>
            </p>
          </Div3D>
        </section>
      </div>
      {isAnimEnded && <FallingCrosses className="fixed -z-10" />}
    </>
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
