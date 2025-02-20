import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InstancedField from '@/components/InstancedField';
import { useLanguage } from '@/providers/language.provider';
import Head from 'next/head';

export default function Home() {
  const { isFrench } = useLanguage();

  return (
    <div className="fixed flex h-screen w-screen flex-col">
      <Head>
        <title>METABOLE STUDIO</title>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </Head>
      <Header />
      <main className="grow">
        <section className="px-x-default flex h-full flex-col justify-center">
          <h1>
            {isFrench ? (
              <>
                Studio créatif qui concoit des{' '}
                <strong className="text-blue font-normal">expériences web</strong> uniques et
                immersives pour les{' '}
                <strong className="text-blue font-normal">entreprises avant-gardistes</strong>
              </>
            ) : (
              <>
                Creative studio that builds{' '}
                <strong className="text-blue font-normal">unique and immersive</strong> web
                experiences for{' '}
                <strong className="text-blue font-normal">forward-thinking companies</strong>.
              </>
            )}
          </h1>
          <p className="mt-10">
            {isFrench ? 'Par ' : 'By '}
            <a className="text-blue" href="https://www.matteocourquin.com/" target="_blank">
              Matteo Courquin
            </a>{' '}
            {isFrench ? ' et  ' : ' and  '}
            <a className="text-blue" href="https://www.jeromebezeau.com/" target="_blank">
              Jérôme Bezeau
            </a>
          </p>
        </section>
      </main>
      <Footer />
      <InstancedField />
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
