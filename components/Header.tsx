import Link from 'next/link';
import ContactPopover from './ContactPopover';
import { LogoTypo } from './Icons';
import Sound from './Sound';

const Header = () => {
  return (
    <header className="px-x-default fixed z-[900] h-[108px] w-full">
      <div className="flex h-[108px] items-center justify-between py-8">
        <Link href="/" scroll={false}>
          <LogoTypo />
        </Link>
        <div className="flex h-[108px] gap-4 py-8">
          <Sound className="shrink-0" />
          <ContactPopover />
        </div>
      </div>
    </header>
  );
};

export default Header;
