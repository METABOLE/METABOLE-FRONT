import Div3D from '@/components/Text3D';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Home() {
  const { isFrench } = useLanguage();
  const { x, y } = useMousePosition();

  const textRef = useRef(null);

  gsap.to(textRef.current, {
    duration: 0.8,
    y: -y / 90,
    x: -x / 90,
    ease: 'power2.out',
  });

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col">
      <section
        ref={textRef}
        className="px-x-default flex h-full w-full flex-col justify-center text-center"
      >
        <Div3D className="text-center" intensity={3}>
          {isFrench ? (
            <h1>
              Studio créatif qui concoit des{' '}
              <strong className="text-blue font-normal">expériences web</strong> uniques et
              immersives pour les{' '}
              <strong className="text-blue font-normal">entreprises avant-gardistes</strong>
            </h1>
          ) : (
            <h1>
              Creative studio that builds{' '}
              <strong className="text-blue font-normal">unique and immersive</strong> web
              experiences for{' '}
              <strong className="text-blue font-normal">forward-thinking companies</strong>.
            </h1>
          )}
          <p className="mt-10">
            {isFrench ? 'Par ' : 'By '}
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
            </a>{' '}
            {isFrench ? ' et  ' : ' and  '}
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
