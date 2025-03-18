import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastModified = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd 
        http://www.w3.org/1999/xhtml 
        http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
  <!-- Version anglaise -->
  <url>
    <loc>https://metabole.studio/en</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://metabole.studio/en" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://metabole.studio/fr" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://metabole.studio/en" />
  </url>
  
  <!-- Version française -->
  <url>
    <loc>https://metabole.studio/fr</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="https://metabole.studio/fr" />
    <xhtml:link rel="alternate" hreflang="en" href="https://metabole.studio/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://metabole.studio/en" />
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap.trim());
  res.end();

  return { props: {} };
};

export default Sitemap;
