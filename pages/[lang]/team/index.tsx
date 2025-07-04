import Expertise from '@/features/home/expertise/Expertise';
import Faq from '@/features/home/Faq';
import Hero from '@/features/team/Hero';
import Inspiration from '@/features/team/Inspiration';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';
import { fetchQuestions } from '@/services/questions.service';
import { QuestionType } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Services({ questions }: { questions: QuestionType[] }) {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <link key="canonical" href={'https://metabole.studio' + asPath + '/team'} rel="canonical" />
      </Head>
      <Hero />
      <Inspiration />
      <Us />
      <Expertise />
      <Faq questions={questions} />
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
