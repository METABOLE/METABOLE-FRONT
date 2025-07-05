import FloatingHalo from '@/components/shared/FloatingHalo';
import Button from '@/components/ui/Button';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import ExpertiseDesktop from './ExpertiseDesktop';
import ExpertiseMobile from './ExpertiseMobile';
import { IconCross } from '@/components/ui/Icons';

const Expertise = ({ isPageServices = false }: { isPageServices?: boolean }) => {
  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const { isFrench, getInternalPath } = useLanguage();

  return (
    <section className="px-x-default gap-y-y-default py-y-double-default relative flex flex-col overflow-hidden bg-black">
      <FloatingHalo
        className="absolute bottom-0 -left-1/2 z-30 h-[200vw] w-[200vw] translate-1/3 opacity-30"
        from="#1b17ee"
        to="#14141800"
      />
      <h1 className="relative w-fit text-white">
        {isFrench ? 'NOS EXPERTISES' : 'OUR EXPERTISES'}
        <IconCross className="absolute -right-10 bottom-0 hidden md:block" color={COLORS.WHITE} />
      </h1>

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
