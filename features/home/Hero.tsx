import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';

const Hero = () => {
  const { isFrench, getInternalPath } = useLanguage();
  return (
    <section className="px-x-default py-y-double-default pb-y-default">
      <h1 className="uppercase">
        {isFrench ? (
          <span className="block md:hidden">
            Conception de <span className="text-blue">sites web</span>{' '}
            <span className="text-blue">uniques</span> et{' '}
            <span className="text-blue">immersifs</span> pour les entreprises avant-gardistes
          </span>
        ) : (
          <span className="block md:hidden">
            Designing <span className="text-blue">unique</span> and{' '}
            <span className="text-blue">immersive</span> websites for{' '}
            <span className="text-blue">forward-thinking</span> company
          </span>
        )}
        {isFrench ? (
          <span className="hidden md:block">
            <span className="relative block text-left whitespace-nowrap">
              <IconCross
                className="absolute -top-10 -right-10 hidden md:block"
                color={COLORS.BLUE}
              />
              Conception de <span className="text-blue">sites web</span>
            </span>
            <span className="relative block text-right whitespace-nowrap">
              <IconCross
                className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
                color={COLORS.BLUE}
              />
              <span className="text-blue">uniques</span> et{' '}
              <span className="text-blue">immersifs</span> pour les
            </span>
            <span className="relative block text-left whitespace-nowrap">
              <IconCross
                className="absolute -right-10 -bottom-10 hidden md:block"
                color={COLORS.BLUE}
              />
              entreprises avant-gardistes
            </span>
          </span>
        ) : (
          <span className="hidden md:block">
            <span className="relative block text-left whitespace-nowrap">
              <IconCross
                className="absolute -top-10 -right-10 hidden md:block"
                color={COLORS.BLUE}
              />
              Designing <span className="text-blue">unique</span> and
            </span>
            <span className="relative block text-right whitespace-nowrap">
              <IconCross
                className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
                color={COLORS.BLUE}
              />
              <span className="text-blue">immersive</span> websites for
            </span>
            <span className="relative block text-left whitespace-nowrap">
              <IconCross
                className="absolute -right-10 -bottom-10 hidden md:block"
                color={COLORS.BLUE}
              />
              <span className="text-blue">forward-thinking</span> company
            </span>
          </span>
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
