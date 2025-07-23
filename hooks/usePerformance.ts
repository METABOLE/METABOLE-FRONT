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
        const runAnimationPerformanceTest = () => {
          return new Promise<number>((resolve) => {
            const start = performance.now();

            // Créer un élément de test pour l'animation
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

            // Animation de blur simple de 0px à 10px
            let frameCount = 0;
            const totalFrames = 30; // 0.5 seconde à 60fps
            let blurValue = 0;

            const animate = () => {
              frameCount++;
              blurValue = (frameCount / totalFrames) * 10; // 0px à 10px linéairement

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

        let executionTime: number;
        let isTimeout = false;

        try {
          executionTime = await Promise.race([
            runAnimationPerformanceTest(),
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

        if (isTimeout || executionTime > 800) {
          performanceLevel = PERFORMANCE_LEVEL.LOW;
        } else if (executionTime <= 600) {
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
