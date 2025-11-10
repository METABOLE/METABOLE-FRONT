import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { usePerformance } from '@/providers/performance.provider';
import clsx from 'clsx';

const PerformanceIndicator = () => {
  const { performanceLevel, executionTime } = usePerformance();

  return (
    <div className="fixed right-4 bottom-4 z-[9999] flex items-center gap-2 rounded-full border border-slate-400/30 bg-slate-300/30 px-2 py-1 text-sm font-medium shadow-lg backdrop-blur-xl">
      <div
        className={clsx(
          'flex h-2 w-2 items-center gap-2 rounded-full',
          performanceLevel === PERFORMANCE_LEVEL.HIGH && 'bg-green-500',
          performanceLevel === PERFORMANCE_LEVEL.MEDIUM && 'bg-yellow-500',
          performanceLevel === PERFORMANCE_LEVEL.LOW && 'bg-red-500',
        )}
      />
      <div className="text-xs opacity-75">{executionTime.toFixed(1)}ms</div>
    </div>
  );
};

export default PerformanceIndicator;
