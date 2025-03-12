import { useState, useEffect } from 'react';

interface TimeState {
  hours: string;
  minutes: string;
  period: string;
}

export const numberFormat = {
  minimumIntegerDigits: 2,
  useGrouping: false,
};

export const useTime = () => {
  const [time, setTime] = useState<TimeState>({
    hours: '00',
    minutes: '00',
    period: 'am',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const formattedTime = formatter.format(now).toLowerCase();
      const [timeStr, period] = formattedTime.split(' ');
      const [hours, minutes] = timeStr.split(':');

      setTime({
        hours,
        minutes,
        period,
      });
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};
