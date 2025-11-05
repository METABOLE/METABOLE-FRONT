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

const STORAGE_KEY = 'metabole_performance_metrics';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

interface CachedMetrics {
  performanceLevel: PERFORMANCE_LEVEL;
  executionTime: number;
  timestamp: number;
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
        const getCachedMetrics = (): CachedMetrics | null => {
          try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
              const parsed: CachedMetrics = JSON.parse(cached);
              const age = Date.now() - parsed.timestamp;
              if (age < CACHE_DURATION) {
                return parsed;
              }
            }
          } catch (error) {
            console.warn('Error reading cached performance metrics:', error);
          }
          return null;
        };

        const cachedMetrics = getCachedMetrics();
        if (cachedMetrics) {
          console.info('Using cached performance metrics:', cachedMetrics);
          setMetrics({
            performanceLevel: cachedMetrics.performanceLevel,
            executionTime: cachedMetrics.executionTime,
            isLoading: false,
          });
          return;
        }

        const waitForStableState = async (): Promise<void> => {
          return new Promise((resolve) => {
            if (document.readyState !== 'complete') {
              window.addEventListener('load', () => resolve(), { once: true });
            } else {
              setTimeout(resolve, 500);
            }
          });
        };

        const isFirstLoad = (): boolean => {
          if ('performance' in window && 'getEntriesByType' in performance) {
            const navigationEntries = performance.getEntriesByType(
              'navigation',
            ) as PerformanceNavigationTiming[];
            if (navigationEntries.length > 0) {
              const [nav] = navigationEntries;
              return nav.type === 'navigate' && nav.transferSize > 0;
            }
          }
          return true;
        };

        const isBrowserBusy = (): boolean => {
          if ('performance' in window && 'getEntriesByType' in performance) {
            const navigationEntries = performance.getEntriesByType(
              'navigation',
            ) as PerformanceNavigationTiming[];
            if (navigationEntries.length > 0) {
              const [nav] = navigationEntries;
              return Date.now() - nav.loadEventEnd < 2000;
            }
          }
          return false;
        };

        const runAnimationPerformanceTest = () => {
          return new Promise<number>((resolve) => {
            const start = performance.now();

            const testElement = document.createElement('div');
            testElement.style.cssText = `
              position: fixed;
              top: -100px;
              left: -100px;
              width: 100px;
              height: 100px;
              background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
              filter: blur(0px);
              z-index: -9999;
              pointer-events: none;
            `;

            document.body.appendChild(testElement);

            let frameCount = 0;
            const totalFrames = 30;
            let blurValue = 0;

            const animate = () => {
              frameCount++;
              blurValue = (frameCount / totalFrames) * 10;

              testElement.style.filter = `blur(${blurValue}px)`;

              if (frameCount < totalFrames) {
                requestAnimationFrame(animate);
              } else {
                const end = performance.now();
                document.body.removeChild(testElement);
                resolve(end - start);
              }
            };

            requestAnimationFrame(animate);
          });
        };

        await waitForStableState();

        const firstLoad = isFirstLoad();

        if (firstLoad) {
          console.info('First load detected, waiting for resources to fully load...');
          await new Promise((resolve) => setTimeout(resolve, 3000));
        } else if (isBrowserBusy()) {
          console.info('Browser still busy, waiting additional 2s...');
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        await new Promise((resolve) => requestIdleCallback(() => resolve(null), { timeout: 1000 }));

        let executionTime: number;
        let isTimeout = false;

        try {
          executionTime = await Promise.race([
            runAnimationPerformanceTest(),
            new Promise<never>((_, reject) => {
              setTimeout(() => {
                isTimeout = true;
                reject(new Error('Performance test timeout'));
              }, 3000);
            }),
          ]);
        } catch (error) {
          console.warn('Performance test timeout after 3s, forcing LOW performance level');
          executionTime = 3000;
        }

        let performanceLevel: PERFORMANCE_LEVEL;

        if (isTimeout || executionTime > 800) {
          performanceLevel = PERFORMANCE_LEVEL.LOW;
        } else if (executionTime <= 600) {
          performanceLevel = PERFORMANCE_LEVEL.HIGH;
        } else {
          performanceLevel = PERFORMANCE_LEVEL.MEDIUM;
        }

        console.table({ executionTime, performanceLevel, firstLoad });

        try {
          const cacheData: CachedMetrics = {
            performanceLevel,
            executionTime,
            timestamp: Date.now(),
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
          console.info('Performance metrics cached for future visits');
        } catch (error) {
          console.warn('Error caching performance metrics:', error);
        }

        const delay = isTimeout ? 3000 : executionTime;
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
