import { useEffect, useState } from 'react';

export enum PERFORMANCE_LEVEL {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
type DeviceType = 'iphone' | 'ipad' | 'mac' | 'android' | 'windows' | 'linux' | 'unknown';

interface PerformanceMetrics {
  performanceLevel: PERFORMANCE_LEVEL;
  performanceScore: number;
  deviceType: DeviceType;
  executionTime: number;
  isLoading: boolean;
}

interface NavigatorWithOptionalProps extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  };
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
    performanceScore: 100,
    deviceType: 'unknown',
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
        const { hardwareConcurrency = 1, userAgent } = navigator;
        const { deviceMemory = 4, connection } = navigator as NavigatorWithOptionalProps;
        const userAgentLower = userAgent.toLowerCase();

        let deviceType: DeviceType = 'unknown';
        let isMobile = false;
        let isTablet = false;
        let isDesktop = false;

        if (/iphone/i.test(userAgentLower)) {
          deviceType = 'iphone';
          isMobile = true;
        } else if (/ipad/i.test(userAgentLower)) {
          deviceType = 'ipad';
          isTablet = true;
        } else if (/macintosh|mac os/i.test(userAgentLower)) {
          deviceType = 'mac';
          isDesktop = true;
        } else if (/android/i.test(userAgentLower)) {
          deviceType = 'android';
          isMobile = true;
          if (
            /tablet|playbook|silk/i.test(userAgentLower) ||
            (window.innerWidth >= 768 && window.innerHeight >= 1024)
          ) {
            isTablet = true;
            isMobile = false;
          }
        } else if (/windows/i.test(userAgentLower)) {
          deviceType = 'windows';
          isDesktop = true;
        } else if (/linux/i.test(userAgentLower)) {
          deviceType = 'linux';
          isDesktop = true;
        }

        const runSimplePerformanceTest = () => {
          const start = performance.now();

          let result = 0;
          for (let i = 0; i < 10000000; i++) {
            result += i;
            void result;
          }

          const end = performance.now();
          const executionTime = end - start;

          let score = 0;
          if (executionTime <= 10) score = 100;
          else if (executionTime <= 20) score = 90;
          else if (executionTime <= 35) score = 80;
          else if (executionTime <= 50) score = 70;
          else if (executionTime <= 75) score = 60;
          else if (executionTime <= 100) score = 50;
          else if (executionTime <= 150) score = 40;
          else if (executionTime <= 200) score = 30;
          else score = 20;

          return {
            executionTime,
            score,
          };
        };

        let performanceTest: { executionTime: number; score: number };
        let isTimeout = false;

        try {
          performanceTest = await Promise.race([
            new Promise<{ executionTime: number; score: number }>((resolve) => {
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
          performanceTest = { executionTime: 2000, score: 20 };
        }

        let performanceScore = performanceTest.score;

        if (isTimeout) {
          performanceScore = 20;
        } else {
          if (connection) {
            if (connection.effectiveType === 'slow-2g') performanceScore -= 30;
            else if (connection.effectiveType === '2g') performanceScore -= 25;
            else if (connection.effectiveType === '3g') performanceScore -= 15;
            else if (connection.effectiveType === '4g') performanceScore -= 8;
          }

          const isOldBrowser =
            /msie|trident|edge 1[2-7]|chrome 5[0-9]|chrome [1-4][0-9]|firefox 5[0-9]|firefox [1-4][0-9]/i.test(
              userAgentLower,
            );
          if (isOldBrowser) performanceScore -= 25;
        }

        performanceScore = Math.max(0, Math.min(100, performanceScore));

        let performanceLevel: PERFORMANCE_LEVEL;
        if (isTimeout || performanceScore < 50) {
          performanceLevel = PERFORMANCE_LEVEL.LOW;
        } else if (performanceScore >= 80) {
          performanceLevel = PERFORMANCE_LEVEL.HIGH;
        } else {
          performanceLevel = PERFORMANCE_LEVEL.MEDIUM;
        }

        console.info('Simple Performance detection:', {
          deviceType,
          hardwareConcurrency,
          deviceMemory,
          performanceTest,
          isMobile,
          isTablet,
          isDesktop,
          performanceScore,
          performanceLevel,
          isTimeout,
          userAgent: userAgentLower.substring(0, 100) + '...',
        });

        const delay = isTimeout ? 2000 : performanceTest.executionTime;
        await new Promise((resolve) => setTimeout(resolve, delay));

        setMetrics({
          performanceLevel,
          performanceScore,
          deviceType,
          executionTime: performanceTest.executionTime,
          isLoading: false,
        });
      };

      detectPerformance();
    }
  }, []);

  return { ...metrics, isAtLeast, isAtMost, isExactly, getConditionalProps };
};

export default usePerformanceHook;
