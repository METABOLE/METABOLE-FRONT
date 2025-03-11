import FloatingHalo from '@/components/FloatingHalo';
import { LogoFull } from '@/components/Icons';
import { COLORS } from '@/types';
import Image from 'next/image';
import { ReactNode } from 'react';

interface NewsletterLayoutProps {
  children: ReactNode;
}

export default function NewsletterLayout({ children }: NewsletterLayoutProps) {
  return (
    <div className="fixed flex h-screen w-screen flex-col bg-black">
      <header className="px-x-default flex w-screen justify-center py-6">
        <LogoFull className="h-10" color={COLORS.YELLOW} />
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
  );
}
