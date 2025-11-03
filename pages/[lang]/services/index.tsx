import Hero from '@/features/services/Hero';
import Expertise from '@/features/shared/expertise/ExpertiseOld';
import Faq from '@/features/shared/Faq';
import Timeline from '@/features/shared/timeline/Timeline';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';

export default function Services() {
  return (
    <>
      <Hero />
      <Expertise isPageServices={true} />
      <Timeline />
      <Us />
      <Faq />
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

  return {
    props: {
      projects,
    },
  };
}
