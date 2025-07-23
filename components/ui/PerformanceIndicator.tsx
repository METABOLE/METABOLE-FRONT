import usePerformance from '@/hooks/usePerformance';
import clsx from 'clsx';

const PerformanceIndicator = () => {
  const { performanceLevel, executionTime } = usePerformance();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'high':
        return 'Très performant';
      case 'medium':
        return 'Moyennement performant';
      case 'low':
        return 'Peu performant';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={clsx(
          'rounded-lg px-3 py-2 text-sm font-medium shadow-lg',
          getLevelColor(performanceLevel),
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-90">{getLevelText(performanceLevel)}</span>
          </div>
          <div className="text-xs opacity-75">Temps: {executionTime.toFixed(1)}ms</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceIndicator;
