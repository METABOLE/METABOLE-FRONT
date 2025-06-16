import ProjectStudio from '@/features/projectStudio/ProjectStudio';
import { useLanguage } from '@/providers/language.provider';

const Pricing = () => {
  const { isFrench } = useLanguage();
  return (
    <section className="px-x-default py-y-default">
      <div className="pt-y-default mx-auto w-full space-y-3 pb-14 md:text-center">
        <h1>Project STUDIO</h1>
        <p className="text-blue p1">
          {isFrench
            ? 'Partagez votre vision, nous la concrétiserons ensemble.'
            : "Share your vision, and we'll bring it to life together."}
        </p>
        <p className="p2">
          {isFrench ? (
            <>
              Sélectionnez vos pages, votre style d'animation préféré, et vos besoins spécifiques.{' '}
              <br />
              Nous vous recontacterons rapidement pour discuter de votre projet.
            </>
          ) : (
            <>
              Select your pages, preferred animation style, and specific needs.
              <br />
              We'll get back to you quickly to discuss your project.
            </>
          )}
        </p>
      </div>
      <ProjectStudio />
    </section>
  );
};

export default Pricing;
