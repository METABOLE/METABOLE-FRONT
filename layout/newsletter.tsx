import FloatingHalo from '@/components/FloatingHalo';
import Lottie from '@/components/Lottie';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import metaboleFull from '../public/lotties/metabole-full-yellow.json';
import { useLanguage } from '@/providers/language.provider';
import SEO from '@/components/SEO';

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
          <Link className="cursor-pointer" href={getInternalPath('/')}>
            <Lottie animationData={metaboleFull} className="h-10" />
          </Link>
        </header>
        <main className="flex-grow">{children}</main>
        <Image
          alt="background"
          className="fixed inset-0 -z-10 h-screen w-screen object-cover"
          height={2160}
          src="/images/background.png"
          width={3840}
        />
        <FloatingHalo
          className="!fixed top-full left-full -z-10 h-[170vw] w-[170vw] opacity-30"
          from="#1b17ee"
          to="#1A1A1A00"
        />
      </div>
    </>
  );
}
