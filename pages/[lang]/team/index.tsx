import Expertise from '@/features/shared/expertise/Expertise';
import Faq from '@/features/shared/Faq';
import Hero from '@/features/team/Hero';
import Inspiration from '@/features/team/Inspiration';
import Us from '@/features/team/Us';
import { fetchClients } from '@/services/clients.service';
import { fetchProjects } from '@/services/projects.service';

export default function Services() {
  return (
    <>
      <Hero />
      <Inspiration />
      <Us isPageTeam />
      <Expertise />
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
  const clients = await fetchClients();

  return {
    props: {
      projects,
      clients,
    },
  };
}
