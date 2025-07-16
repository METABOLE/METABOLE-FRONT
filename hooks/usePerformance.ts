import { useEffect, useState } from 'react';

type PerformanceLevel = 'high' | 'medium' | 'low';
type DeviceType = 'iphone' | 'ipad' | 'mac' | 'android' | 'windows' | 'linux' | 'unknown';

interface PerformanceMetrics {
  performanceLevel: PerformanceLevel;
  performanceScore: number;
  deviceType: DeviceType;
  executionTime: number;
}

const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    performanceLevel: 'high',
    performanceScore: 100,
    deviceType: 'unknown',
    executionTime: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectPerformance = () => {
        const { hardwareConcurrency = 1, userAgent, platform } = navigator;
        const { deviceMemory = 4, connection } = navigator as any;
        const userAgentLower = userAgent.toLowerCase();
        const platformLower = platform.toLowerCase();

        // Détection précise du type d'appareil
        let deviceType: DeviceType = 'unknown';
        let isMobile = false;
        let isTablet = false;
        let isDesktop = false;

        // Détection iOS/iPadOS
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
          // Détection tablette Android
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

        // Test de performance simple et fiable
        const runSimplePerformanceTest = () => {
          const start = performance.now();

          // Boucle simple de calcul - plus c'est rapide, plus l'appareil est performant
          let result = 0;
          for (let i = 0; i < 10000000; i++) {
            result += i;
          }

          const end = performance.now();
          const executionTime = end - start;

          // Convertir le temps en score (plus rapide = score plus élevé)
          // Basé sur des benchmarks réels :
          // - iPhone 15 Pro : ~5-10ms = 95-100 points
          // - iPhone 12 : ~15-25ms = 80-90 points
          // - iPad ancien : ~50-100ms = 40-60 points
          // - Vieux appareil : ~200ms+ = 20-40 points

          let score = 0;
          if (executionTime <= 10)
            score = 100; // Très rapide
          else if (executionTime <= 20)
            score = 90; // Rapide
          else if (executionTime <= 35)
            score = 80; // Bon
          else if (executionTime <= 50)
            score = 70; // Moyen
          else if (executionTime <= 75)
            score = 60; // Assez lent
          else if (executionTime <= 100)
            score = 50; // Lent
          else if (executionTime <= 150)
            score = 40; // Très lent
          else if (executionTime <= 200)
            score = 30; // Extrêmement lent
          else score = 20; // Très ancien

          return {
            executionTime,
            score,
          };
        };

        const performanceTest = runSimplePerformanceTest();

        // Calcul du score final basé uniquement sur le test de performance
        let performanceScore = performanceTest.score;

        // Ajustements basés sur la connexion
        if (connection) {
          if (connection.effectiveType === 'slow-2g') performanceScore -= 30;
          else if (connection.effectiveType === '2g') performanceScore -= 25;
          else if (connection.effectiveType === '3g') performanceScore -= 15;
          else if (connection.effectiveType === '4g') performanceScore -= 8;
        }

        // Détection d'anciens navigateurs
        const isOldBrowser =
          /msie|trident|edge 1[2-7]|chrome 5[0-9]|chrome [1-4][0-9]|firefox 5[0-9]|firefox [1-4][0-9]/i.test(
            userAgentLower,
          );
        if (isOldBrowser) performanceScore -= 25;

        // Limiter le score
        performanceScore = Math.max(0, Math.min(100, performanceScore));

        // Déterminer le niveau de performance
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

        setMetrics({
          performanceLevel,
          performanceScore,
          deviceType,
          executionTime: performanceTest.executionTime,
        });
      };

      detectPerformance();
    }
  }, []);

  return metrics;
};

export default usePerformance;
