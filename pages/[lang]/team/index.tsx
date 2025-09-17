import Expertise from '@/features/shared/expertise/Expertise';
import Faq from '@/features/shared/Faq';
import Hero from '@/features/team/Hero';
import Inspiration from '@/features/team/Inspiration';
import Us from '@/features/team/Us';
import { fetchClients } from '@/services/clients.service';
import { fetchProjects } from '@/services/projects.service';
import { fetchQuestions } from '@/services/questions.service';
import { QuestionType } from '@/types';

export default function Services({ questions }: { questions: QuestionType[] }) {
  return (
    <>
      <Hero />
      <Inspiration />
      <Us isPageTeam />
      {/* <TrustedBy clients={clients} /> */}
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
  const clients = await fetchClients();

  return {
    props: {
      projects,
      questions,
      clients,
    },
  };
}
