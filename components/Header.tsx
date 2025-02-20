import Link from 'next/link';
import Button from './Button';
import { LogoTypo } from './Icons';
import Sound from './Sound';

const Header = () => {
  return (
    <header className="px-x-default fixed z-[900] w-full">
      <div className="flex items-center justify-between py-8">
        <Link href="/" scroll={false}>
          <LogoTypo />
        </Link>
        <div className="flex gap-4">
          <Sound className="shrink-0" />
          <Button transformOrigin="right">CONTACT</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
