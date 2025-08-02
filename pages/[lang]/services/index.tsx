import Expertise from '@/features/shared/expertise/Expertise';
import Faq from '@/features/shared/Faq';
import Hero from '@/features/services/Hero';
import Timeline from '@/features/shared/timeline/Timeline';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';
import { fetchQuestions } from '@/services/questions.service';
import { QuestionType } from '@/types';

export default function Services({ questions }: { questions: QuestionType[] }) {
  return (
    <>
      <Hero />
      <Expertise isPageServices={true} />
      <Timeline />
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
