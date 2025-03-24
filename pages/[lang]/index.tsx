import { AnimatedTitle } from '@/components/AnimatedTitle';
import Div3D from '@/components/Text3D';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const TITLE = {
  FR: [
    { text: 'Studio ', isBlue: false },
    { text: 'créatif ', isBlue: false },
    { text: 'qui ', isBlue: false },
    { text: 'concoit ', isBlue: false },
    { text: 'des ', isBlue: false },
    { text: 'expériences ', isBlue: true },
    { text: 'web ', isBlue: true },
    { text: 'uniques ', isBlue: false },
    { text: 'et ', isBlue: false },
    { text: 'immersives ', isBlue: false },
    { text: 'pour ', isBlue: false },
    { text: 'les ', isBlue: false },
    { text: 'entreprises ', isBlue: true },
    { text: 'avant-', isBlue: true },
    { text: 'gardistes.', isBlue: true },
  ],
  EN: [
    { text: 'Creative ', isBlue: false },
    { text: 'studio ', isBlue: false },
    { text: 'that ', isBlue: false },
    { text: 'builds ', isBlue: false },
    { text: 'unique ', isBlue: true },
    { text: 'and ', isBlue: true },
    { text: 'immersive ', isBlue: true },
    { text: 'web ', isBlue: false },
    { text: 'experiences ', isBlue: false },
    { text: 'for ', isBlue: false },
    { text: 'forward-', isBlue: true },
    { text: 'thinking ', isBlue: true },
    { text: 'companies.', isBlue: true },
  ],
};

export default function Home() {
  const { isFrench } = useLanguage();
  const { isProd } = useEnvironment();
  const { x, y } = useMousePosition();
  const { asPath } = useRouter();

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
        delay: 4.5,
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
      .set(createdByRef.current, {
        overflow: 'visible',
      })
      .add(() => setIsAnimEnded(true));
  }, [isProd]);

  return (
    <>
      <Head>
        <link key="canonical" href={'https://metabole.studio' + asPath} rel="canonical" />
      </Head>
      <div className="fixed inset-0 flex h-screen w-screen flex-col">
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
                    alt=""
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
                    alt=""
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
