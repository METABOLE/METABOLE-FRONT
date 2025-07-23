import FloatingHalo from '@/components/shared/FloatingHalo';
import Lottie from '@/components/shared/Lottie';
import SEO from '@/components/ui/SEO';
import { useLanguage } from '@/providers/language.provider';
import Link from 'next/link';
import { ReactNode } from 'react';
import metaboleFull from '../public/lotties/metabole-full-yellow.json';
import Background from '@/components/layout/BackgroundInteractive';

interface NewsletterLayoutProps {
  children: ReactNode;
}

export default function NewsletterLayout({ children }: NewsletterLayoutProps) {
  const { getInternalPath, isFrench } = useLanguage();
  return (
    <>
      <SEO isFrench={isFrench} />
      <div className="fixed flex h-screen w-screen flex-col bg-black">
        <header className="px-x-default flex w-screen justify-center py-6">
          <Link className="cursor-pointer" href={getInternalPath('/')} scroll={false}>
            <Lottie animationData={metaboleFull} className="h-10" />
          </Link>
        </header>
        <main className="flex-grow">{children}</main>
        <FloatingHalo
          className="!fixed top-full left-full -z-10 h-[170vw] w-[170vw] opacity-30"
          from="#1b17ee"
          to="#1A1A1A00"
        />
        <Background />
      </div>
    </>
  );
}
