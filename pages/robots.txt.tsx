import { GetServerSideProps } from 'next';

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = `# robots.txt pour Metabole STUDIO
User-agent: *
Allow: /en
Allow: /fr

# Pages à ne pas indexer
Disallow: /unsubscribe
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /studio

# Paramètres de crawling
Crawl-delay: 1

# Sitemap
Sitemap: https://metabole.studio/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return { props: {} };
};

export default Robots;
