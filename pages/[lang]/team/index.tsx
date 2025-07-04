import Faq from '@/features/home/Faq';
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
      <h1>TEAM</h1>
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
