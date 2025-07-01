import Button from '@/components/ui/Button';
import { useLanguage } from '@/providers/language.provider';

const Hero = () => {
  const { isFrench, getInternalPath } = useLanguage();
  return (
    <section className="px-x-default py-y-double-default pb-y-default">
      <h1 className="uppercase">
        {isFrench ? (
          <>
            Conception de <span className="text-blue">sites web</span>{' '}
            <span className="text-blue">uniques</span> et{' '}
            <span className="text-blue">immersifs</span> pour les entreprises avant-gardistes
          </>
        ) : (
          <>
            Designing <span className="text-blue">unique</span> and{' '}
            <span className="text-blue">immersive</span> websites for{' '}
            <span className="text-blue">forward-thinking</span> businesses
          </>
        )}
      </h1>
      <div className="flex gap-4 pt-8">
        <Button color="secondary" href={getInternalPath('/contact')}>
          {isFrench ? 'CONTACT' : 'CONTACT'}
        </Button>
        <Button color="primary" href={getInternalPath('/pricing')}>
          {isFrench ? 'TARIFS' : 'PRICING'}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
