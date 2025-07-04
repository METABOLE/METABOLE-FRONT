import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS } from '@/types';
import ExpertiseMobile from './ExpertiseMobile';
import ExpertiseDesktop from './ExpertiseDesktop';
import FloatingHalo from '@/components/shared/FloatingHalo';
import clsx from 'clsx';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/providers/language.provider';

const Expertise = ({ isPageServices = false }: { isPageServices?: boolean }) => {
  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const { isFrench, getInternalPath } = useLanguage();

  return (
    <section
      className={clsx(
        'px-x-default gap-y-y-default relative flex flex-col overflow-hidden bg-black',
        isPageServices ? 'pb-y-double-default pt-y-default' : 'py-y-default',
      )}
    >
      <FloatingHalo
        className="-top-1/2 -left-1/2 z-30 h-[200vw] w-[200vw] opacity-30"
        from="#1b17ee"
        to="#14141800"
      />
      <h1 className="text-white">NOS EXPERTISES</h1>

      {isMobile ? <ExpertiseMobile /> : <ExpertiseDesktop />}
      {!isPageServices && (
        <Button
          className="z-30"
          color="primary"
          href={getInternalPath('/services')}
          isDark={true}
          scroll={false}
        >
          {isFrench ? 'NOS SERVICES' : 'OUR SERVICES'}
        </Button>
      )}
    </section>
  );
};

export default Expertise;
