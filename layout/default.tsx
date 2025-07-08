import Background from '@/components/layout/Background';
import Burger from '@/components/layout/Burger';
import Footer from '@/components/layout/Footer';
import Menu from '@/components/layout/Menu';
import ScrollBar from '@/components/layout/ScrollBar';
import SEO from '@/components/ui/SEO';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
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

  return (
    <>
      <SEO isFrench={isFrench} />
      {isTablet ? <Burger /> : <Menu projects={projects} />}
      <main className="min-h-screen md:pb-[300px]">{children}</main>
      {!isMobile && <ScrollBar />}
      <Footer />
      <Background />
    </>
  );
};

export default Layout;
