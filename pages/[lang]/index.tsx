import FloatingHalo from '@/components/shared/FloatingHalo';
import Expertise from '@/features/home/expertise/Expertise';
import Faq from '@/features/home/Faq';
import Hero from '@/features/home/Hero';
import Philosophy from '@/features/home/Philosophy';
import Process from '@/features/services/Process';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';
import { fetchQuestions } from '@/services/questions.service';
import { QuestionType } from '@/types';

export default function Home({ questions }: { questions: QuestionType[] }) {
  return (
    <div className="relative overflow-hidden">
      <FloatingHalo
        className="pointer-events-none absolute top-0 left-full -z-10 h-[150vw] w-[150vw] opacity-40"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      <Hero />
      <Philosophy />
      <Expertise />
      <Process />
      <Us />
      <Faq questions={questions} />
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
  const projects = await fetchProjects();
  const questions = await fetchQuestions();

  return {
    props: {
      projects,
      questions,
    },
  };
}
