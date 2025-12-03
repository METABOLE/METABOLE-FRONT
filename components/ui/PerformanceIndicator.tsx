import useClearSiteData from '@/hooks/useClearSiteData';
import { PERFORMANCE_LEVEL, STORAGE_KEY } from '@/hooks/usePerformance';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { usePerformance } from '@/providers/performance.provider';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const getTimeRemaining = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return 'no cache';

    const parsed = JSON.parse(cached);
    const CACHE_DURATION = 30 * 60 * 1000;
    const age = Date.now() - parsed.timestamp;
    const remaining = CACHE_DURATION - age;

    if (remaining <= 0) return 'expired';

    const minutes = Math.floor(remaining / 60000);
    return `${minutes}min`;
  } catch {
    return 'error';
  }
};

const PerformanceIndicator = () => {
  const { performanceLevel, executionTime, score, isLoading, os, osVersion, isOldOS } =
    usePerformance();
  const isTouchDevice = useTouchDevice();

  const { clearSiteData } = useClearSiteData();
  const [isHovered, setIsHovered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('--');

  useEffect(() => {
    setTimeRemaining(getTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = async () => {
    if (
      window.confirm(
        '⚠️ Clear all site data and reload?\n\nThis will delete:\n• localStorage\n• sessionStorage\n• Cookies\n• IndexedDB\n• Cache Storage\n• Service Workers\n\nThe page will reload automatically.',
      )
    ) {
      await clearSiteData();
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-9999 -translate-x-1/2">
      <div
        className={clsx(
          'absolute right-1/2 bottom-full mb-2 w-64 origin-bottom translate-x-1/2 rounded-lg border border-slate-400/30 bg-slate-900/95 p-3 text-sm shadow-xl backdrop-blur-xl transition-[opacity,scale]',
          isHovered && !isLoading
            ? 'pointer-events-auto visible scale-100 opacity-100'
            : 'pointer-events-none invisible scale-90 opacity-0',
        )}
      >
        <div className="mb-2 flex items-center justify-between border-b border-slate-700 pb-2">
          <span className="font-semibold text-slate-200">Performance Metrics</span>
          <div
            className={clsx(
              'rounded-full px-2 py-0.5 text-xs font-bold',
              performanceLevel === PERFORMANCE_LEVEL.HIGH && 'bg-green-500/20 text-green-400',
              performanceLevel === PERFORMANCE_LEVEL.LOW && 'bg-red-500/20 text-red-400',
            )}
          >
            {performanceLevel.toUpperCase()}
          </div>
        </div>
        <div className="space-y-1.5 text-slate-300">
          {executionTime !== 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">Animation Time:</span>
              <span className="font-mono font-semibold">{executionTime.toFixed(0)}ms</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-400">Score:</span>
            <span className="font-mono font-semibold">{score}/100</span>
          </div>
          {os && (
            <div className="flex justify-between">
              <span className="text-slate-400">OS:</span>
              <span className="font-mono text-xs font-semibold text-slate-200">
                {os}
                {osVersion ? ` ${osVersion}` : ' (unknown version)'}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-400">Cache expires in:</span>
            <span className="font-mono text-xs text-slate-400">{timeRemaining}</span>
          </div>
        </div>
        <button
          className="mt-2 w-full border-t border-slate-700 pt-2 text-left text-xs text-slate-500"
          onClick={handleClick}
        >
          Click to clear cache & reload
        </button>
      </div>

      <button
        className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-400/30 bg-slate-300/30 px-2 py-1 text-sm font-medium shadow-lg backdrop-blur-xl transition-all hover:scale-105"
        onClick={isTouchDevice ? undefined : handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={clsx(
            'flex h-2 w-2 items-center gap-2 rounded-full',
            performanceLevel === PERFORMANCE_LEVEL.HIGH && 'bg-green-500',
            performanceLevel === PERFORMANCE_LEVEL.LOW && 'bg-red-500',
          )}
        />
        <div className="text-xs opacity-75">
          {isOldOS ? 'Old OS' : executionTime.toFixed(0) + 'ms'}
        </div>
      </button>
    </div>
  );
};

export default PerformanceIndicator;
