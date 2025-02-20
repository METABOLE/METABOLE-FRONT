import { numberFormat, useTime } from '@/hooks/useTime';
import NumberFlow from '@number-flow/react';
import clsx from 'clsx';

const Time = ({ isDark = false }: { isDark?: boolean }) => {
  const { hours, minutes, period } = useTime();

  return (
    <p className={clsx(isDark ? 'text-white' : 'text-black')}>
      <NumberFlow format={numberFormat} value={Number(hours)} />
      :
      <NumberFlow format={numberFormat} value={Number(minutes)} />
      <span className={clsx('uppercase', isDark ? 'text-white-30' : 'text-black-30')}>
        {period}
      </span>
    </p>
  );
};

export default Time;
