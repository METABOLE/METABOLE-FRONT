import FloatingHalo from '@/components/FloatingHalo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InstancedField from '@/components/InstancedField';
import Text3D from '@/components/Text3D';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import gsap from 'gsap';
import Head from 'next/head';
import { useRef } from 'react';

export default function Home() {
  const { isFrench } = useLanguage();
  const { x, y } = useMousePosition();

  const textRef = useRef(null);

  gsap.to(textRef.current, {
    duration: 0.5,
    y: -y / 90,
    x: -x / 90,
    ease: 'power2.out',
  });

  return (
    <div className="flex h-[140vh] w-screen flex-col">
      <Head>
        <title>METABOLE STUDIO</title>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </Head>
      <Header />
      <main className="fixed flex h-screen w-screen">
        <section className="px-x-default flex h-full flex-col justify-center">
          <h1 ref={textRef} className="w-full md:w-2/3">
            {isFrench ? (
              <Text3D intensity={3}>
                Studio créatif qui concoit des{' '}
                <strong className="text-blue font-normal">expériences web</strong> uniques et
                immersives pour les{' '}
                <strong className="text-blue font-normal">entreprises avant-gardistes</strong>
              </Text3D>
            ) : (
              <Text3D intensity={3}>
                Creative studio that builds{' '}
                <strong className="text-blue font-normal">unique and immersive</strong> web
                experiences for{' '}
                <strong className="text-blue font-normal">forward-thinking companies</strong>.
              </Text3D>
            )}
          </h1>
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
        </section>
      </main>
      <Footer />
      <InstancedField />
      <FloatingHalo
        className="!fixed top-1/2 -left-full -z-10 h-[250vw] w-[250vw]"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      {/* <Analytics />
      <SpeedInsights /> */}
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
