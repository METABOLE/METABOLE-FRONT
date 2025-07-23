import { useEffect, useState } from 'react';

export enum PERFORMANCE_LEVEL {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

interface PerformanceMetrics {
  performanceLevel: PERFORMANCE_LEVEL;
  executionTime: number;
  isLoading: boolean;
}

const PERFORMANCE_LEVEL_VALUES = {
  [PERFORMANCE_LEVEL.LOW]: 1,
  [PERFORMANCE_LEVEL.MEDIUM]: 2,
  [PERFORMANCE_LEVEL.HIGH]: 3,
} as const;

interface PerformanceUtils {
  isAtLeast: (level: PERFORMANCE_LEVEL) => boolean;
  isAtMost: (level: PERFORMANCE_LEVEL) => boolean;
  isExactly: (level: PERFORMANCE_LEVEL) => boolean;
  getConditionalProps: <T>(props: Record<PERFORMANCE_LEVEL, T>) => T | undefined;
}

const usePerformanceHook = (): PerformanceMetrics & PerformanceUtils => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    performanceLevel: PERFORMANCE_LEVEL.HIGH,
    executionTime: 0,
    isLoading: true,
  });

  const isAtLeast = (level: PERFORMANCE_LEVEL): boolean => {
    return PERFORMANCE_LEVEL_VALUES[metrics.performanceLevel] >= PERFORMANCE_LEVEL_VALUES[level];
  };

  const isAtMost = (level: PERFORMANCE_LEVEL): boolean => {
    return PERFORMANCE_LEVEL_VALUES[metrics.performanceLevel] <= PERFORMANCE_LEVEL_VALUES[level];
  };

  const isExactly = (level: PERFORMANCE_LEVEL): boolean => {
    return metrics.performanceLevel === level;
  };

  const getConditionalProps = <T>(props: Record<PERFORMANCE_LEVEL, T>): T | undefined => {
    return props[metrics.performanceLevel];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectPerformance = async () => {
        const runSimplePerformanceTest = () => {
          const start = performance.now();

          let result = 0;
          for (let i = 0; i < 10000000; i++) {
            result += i;
            void result;
          }

          const end = performance.now();
          return end - start;
        };

        let executionTime: number;
        let isTimeout = false;

        try {
          executionTime = await Promise.race([
            new Promise<number>((resolve) => {
              resolve(runSimplePerformanceTest());
            }),
            new Promise<never>((_, reject) => {
              setTimeout(() => {
                isTimeout = true;
                reject(new Error('Performance test timeout'));
              }, 2000);
            }),
          ]);
        } catch (error) {
          console.warn('Performance test timeout after 2s, forcing LOW performance level');
          executionTime = 2000;
        }

        let performanceLevel: PERFORMANCE_LEVEL;

        if (isTimeout || executionTime > 50) {
          performanceLevel = PERFORMANCE_LEVEL.LOW;
        } else if (executionTime <= 20) {
          performanceLevel = PERFORMANCE_LEVEL.HIGH;
        } else {
          performanceLevel = PERFORMANCE_LEVEL.MEDIUM;
        }

        console.info('Performance detection based on execution time:', {
          executionTime: `${executionTime.toFixed(2)}ms`,
          performanceLevel,
          isTimeout,
        });

        const delay = isTimeout ? 2000 : executionTime;
        await new Promise((resolve) => setTimeout(resolve, delay));

        setMetrics({
          performanceLevel,
          executionTime,
          isLoading: false,
        });
      };

      detectPerformance();
    }
  }, []);

  return { ...metrics, isAtLeast, isAtMost, isExactly, getConditionalProps };
};

export default usePerformanceHook;
