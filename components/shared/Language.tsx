import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import { forwardRef } from 'react';
import Link from 'next/link';

const Language = forwardRef<HTMLDivElement, { isDark?: boolean; className?: string }>(
  ({ isDark, className }, ref) => {
    const { isFrench, getChangeLanguagePath } = useLanguage();

    const frenchPath = getChangeLanguagePath(true);
    const englishPath = getChangeLanguagePath(false);

    return (
      <div
        ref={ref}
        className={clsx('p3 flex gap-2', isDark ? 'text-white-30' : 'text-black-30', className)}
      >
        <Link
          className={clsx('cursor-pointer', isFrench && (isDark ? 'text-yellow' : 'text-blue'))}
          href={frenchPath}
          scroll={false}
        >
          FR
        </Link>
        <Link
          className={clsx('cursor-pointer', !isFrench && (isDark ? 'text-yellow' : 'text-blue'))}
          href={englishPath}
          scroll={false}
        >
          EN
        </Link>
      </div>
    );
  },
);

export default Language;
