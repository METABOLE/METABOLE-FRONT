import Faq from '@/features/home/Faq';
import Hero from '@/features/home/Hero';
import Philosophy from '@/features/home/Philosophy';
import { fetchProjects } from '@/services/projects.service';
import { fetchQuestions } from '@/services/questions.service';
import { QuestionType } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home({ questions }: { questions: QuestionType[] }) {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <link key="canonical" href={'https://metabole.studio' + asPath} rel="canonical" />
      </Head>
      <Hero />
      <Philosophy />
      <Faq questions={questions} />
      {/* <div className="inset-0 flex h-screen w-screen flex-col">
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
      </div> */}
      {/* {isAnimEnded && <FallingCrosses className="fixed -z-10" />} */}
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
  const projects = await fetchProjects();
  const questions = await fetchQuestions();

  return {
    props: {
      projects,
      questions,
    },
  };
}
