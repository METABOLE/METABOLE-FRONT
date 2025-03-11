import { useLanguage } from '@/providers/language.provider';
import Link from 'next/link';
import metaboleFull from '../public/lotties/metabole-full.json';
import metaboleSmall from '../public/lotties/metabole-small.json';
import ContactPopover from './ContactPopover';
import Lottie from './Lottie';
import Sound from './Sound';

const Header = () => {
  const { getInternalPath } = useLanguage();

  return (
    <header className="px-x-default fixed z-[900] h-[108px] w-full">
      <div className="flex h-[108px] items-center justify-between py-8">
        <Link href={getInternalPath('/')} scroll={false}>
          <Lottie animationData={metaboleFull} className="hidden h-10 md:block" />
          <Lottie animationData={metaboleSmall} className="block h-10 w-10 md:hidden" />
        </Link>
        <div className="relative flex h-[108px] gap-4 py-8">
          <Sound className="shrink-0" />
          <div className="relative w-[117px] md:w-auto">
            <ContactPopover />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
