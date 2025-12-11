import SEO from '@/components/ui/SEO';
import Hero from '@/features/index/Hero';

export default function Home() {
  return (
    <>
      <SEO
        descriptionEn="Metabole Studio is a creative agency specialized in design and web development. We create unique and innovative digital experiences."
        descriptionFr="Metabole Studio est une agence créative spécialisée dans le design et le développement web. Nous créons des expériences digitales uniques et innovantes."
        noindex={true}
        title="Metabole Studio - Agence de Design et Développement Web"
        url="https://metabole.studio"
      />
      <Hero />
    </>
  );
}
