import { useEffect, useState } from 'react';

type PerformanceLevel = 'high' | 'medium' | 'low';
type DeviceType = 'iphone' | 'ipad' | 'mac' | 'android' | 'windows' | 'linux' | 'unknown';

interface PerformanceMetrics {
  performanceLevel: PerformanceLevel;
  performanceScore: number;
  deviceType: DeviceType;
  executionTime: number;
  isLoading: boolean;
}

const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    performanceLevel: 'high',
    performanceScore: 100,
    deviceType: 'unknown',
    executionTime: 0,
    isLoading: true,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectPerformance = async () => {
        const { hardwareConcurrency = 1, userAgent } = navigator;
        const { deviceMemory = 4, connection } = navigator as any;
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

        const performanceTest = runSimplePerformanceTest();

        let performanceScore = performanceTest.score;

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

        performanceScore = Math.max(0, Math.min(100, performanceScore));

        let performanceLevel: PerformanceLevel;
        if (performanceScore >= 80) {
          performanceLevel = 'high';
        } else if (performanceScore >= 50) {
          performanceLevel = 'medium';
        } else {
          performanceLevel = 'low';
        }

        console.log('Simple Performance detection:', {
          deviceType,
          hardwareConcurrency,
          deviceMemory,
          performanceTest,
          isMobile,
          isTablet,
          isDesktop,
          performanceScore,
          performanceLevel,
          userAgent: userAgentLower.substring(0, 100) + '...',
        });

        // Garantir un délai minimum de 2 secondes
        const minDelay = 2000;
        const actualDelay = Math.max(minDelay, performanceTest.executionTime);

        // Attendre le délai minimum ou le temps d'exécution réel
        await new Promise((resolve) => setTimeout(resolve, actualDelay));

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

  return metrics;
};

export default usePerformance;
