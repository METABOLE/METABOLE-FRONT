import Expertise from '@/features/home/expertise/Expertise';
import Faq from '@/features/home/Faq';
import Hero from '@/features/services/Hero';
import Process from '@/features/services/Process';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';
import { fetchQuestions } from '@/services/questions.service';
import { QuestionType } from '@/types';

export default function Services({ questions }: { questions: QuestionType[] }) {
  return (
    <>
      <Hero />
      <Expertise isPageServices={true} />
      <Process />
      <Us />
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
