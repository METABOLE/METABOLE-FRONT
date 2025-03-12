import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';

const Language = ({ isDark }: { isDark?: boolean }) => {
  const { isFrench, setIsFrench } = useLanguage();

  return (
    <div className={clsx('p3 flex gap-2', isDark ? 'text-white-30' : 'text-black-30')}>
      <button
        className={clsx('cursor-pointer', isFrench && (isDark ? 'text-yellow' : 'text-blue'))}
        onClick={() => setIsFrench(true)}
      >
        FR
      </button>
      <button
        className={clsx('cursor-pointer', !isFrench && (isDark ? 'text-yellow' : 'text-blue'))}
        onClick={() => setIsFrench(false)}
      >
        EN
      </button>
    </div>
  );
};

export default Language;
