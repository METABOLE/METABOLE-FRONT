import Button from '@/components/ui/Button';
import { useLanguage } from '@/providers/language.provider';

const Philosophy = () => {
  const { isFrench, getInternalPath } = useLanguage();
  return (
    <section className="px-x-double-default gap-y-default pb-y-default flex flex-col items-center">
      <button className="label">SCROLL</button>
      <div className="bg-blur-glass aspect-video w-2/3 rounded-3xl"></div>
      <h2 className="mr-auto w-1/2">
        {isFrench ? (
          <>
            Metabole est un <span className="text-blue">studio créatif</span> qui conçoit des{' '}
            <span className="text-blue">expériences intéractives</span> et
            <span className="text-blue">performantes</span>.
          </>
        ) : (
          <>
            Metabole is a <span className="text-blue">creative studio</span> that designs{' '}
            <span className="text-blue">interactive</span> and{' '}
            <span className="text-blue">high-performance</span> experiences.
          </>
        )}
      </h2>
      <div className="ml-auto w-1/2">
        <p className="p2 pb-8">
          En mettant l’accent sur l’<span className="text-blue">esthétique</span> et l’
          <span className="text-blue">accessibilité</span>, nous imaginons des interfaces{' '}
          <span className="text-blue">fluides</span> et
          <span className="text-blue">innovantes</span>, pensées pour{' '}
          <span className="text-blue">évoluer</span> avec les besoins de demain.
        </p>
      </div>
      <Button href={getInternalPath('/contact')}>
        {isFrench ? 'DECOUVRIR NOS SERVICES' : 'DISCOVER OUR SERVICES'}
      </Button>
    </section>
  );
};

export default Philosophy;
