import QuoteBuilder from '@/components/quoteBuilder/QuoteBuilder';
import { useLanguage } from '@/providers/language.provider';

const Pricing = () => {
  const { isFrench } = useLanguage();
  return (
    <section className="px-x-default py-y-default">
      <div className="pt-y-default mx-auto w-full space-y-3 pb-14 md:text-center">
        <h1>{isFrench ? 'Estimez votre site idéal' : 'Estimate your ideal website'}</h1>
        <p className="text-blue p1">
          {isFrench
            ? 'Imaginez un site à votre image, en quelques étapes.'
            : 'Imagine a website that reflects you — in just a few steps.'}
        </p>
        <p className="p2">
          {isFrench ? (
            <>
              Choisissez vos pages, le style d’animation, et les options essentielles. <br />
              Obtenez une estimation claire — libre à vous de nous confier la suite.
            </>
          ) : (
            <>
              Choose your pages, animation style, and essential features.
              <br />
              Get a clear estimate — then decide if you'd like us to bring it to life.
            </>
          )}
        </p>
      </div>
      <QuoteBuilder />
    </section>
  );
};

export default Pricing;
