import BackgroundInteractive from '@/components/layout/BackgroundInteractive';
import BackgroundStatic from '@/components/layout/BackgroundStatic';
import Burger from '@/components/layout/Burger';
import Footer from '@/components/layout/Footer';
import Menu from '@/components/layout/Menu';
import ScrollBar from '@/components/layout/ScrollBar';
import PerformanceIndicator from '@/components/ui/PerformanceIndicator';
import SEO from '@/components/ui/SEO';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useEnvironment } from '@/hooks/useEnvironment';
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
  const { isAtLeast } = usePerformance();
  const { isProd } = useEnvironment();
  const { isLoading } = usePerformance();

  return (
    <>
      <SEO isFrench={isFrench} />
      {isTablet ? <Burger /> : <Menu projects={projects} />}

      <main className="min-h-screen w-screen overflow-hidden md:pb-[300px]">
        {isLoading ? <div className="fixed z-[9999] h-screen w-screen bg-black" /> : children}
      </main>
      {!isMobile && <ScrollBar />}
      <Footer />
      {isAtLeast(PERFORMANCE_LEVEL.HIGH) ? <BackgroundInteractive /> : <BackgroundStatic />}
      {!isProd && <PerformanceIndicator />}
    </>
  );
};

export default Layout;
