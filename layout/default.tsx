import BackgroundInteractive from '@/components/layout/BackgroundInteractive';
import BackgroundStatic from '@/components/layout/BackgroundStatic';
import Burger from '@/components/layout/Burger';
import Footer from '@/components/layout/Footer';
import GradientBlur from '@/components/layout/GradientBlur';
import Menu from '@/components/layout/Menu';
import ScrollBar from '@/components/layout/ScrollBar';
import PerformanceIndicator from '@/components/ui/PerformanceIndicator';
import SEO from '@/components/ui/SEO';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useFontReady } from '@/hooks/useFontReady';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS, ProjectType } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Layout = ({ projects, children }: { projects: ProjectType[]; children: ReactNode }) => {
  const { isFrench } = useLanguage();
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const { performanceLevel } = usePerformance();
  const { isDev } = useEnvironment();
  const { isLoading } = usePerformance();
  const isFontReady = useFontReady();

  return (
    <>
      <SEO isFrench={isFrench} />

      <main className="min-h-screen w-screen overflow-hidden md:pb-[300px]">
        {isLoading || !isFontReady ? (
          <div className="fixed z-[950] h-screen w-screen bg-black" />
        ) : (
          <>
            {isTablet ? <Burger /> : <Menu projects={projects} />}
            {children}
            {performanceLevel === PERFORMANCE_LEVEL.HIGH && (
              <>
                <GradientBlur blurHeight="100px" intensity={0.2} orientation="top" />
                <GradientBlur blurHeight="100px" intensity={0.1} orientation="bottom" />
              </>
            )}
            {!isMobile && <ScrollBar />}
            {performanceLevel === PERFORMANCE_LEVEL.HIGH ? (
              <BackgroundInteractive />
            ) : (
              <BackgroundStatic />
            )}
            {isDev && <PerformanceIndicator />}
          </>
        )}
      </main>
      {isFontReady && <Footer />}
    </>
  );
};

export default Layout;
