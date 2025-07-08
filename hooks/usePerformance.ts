import { useEffect, useState } from 'react';

type PerformanceLevel = 'high' | 'medium' | 'low';

interface PerformanceMetrics {
  performanceLevel: PerformanceLevel;
  performanceScore: number;
}

const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    performanceLevel: 'high',
    performanceScore: 100,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Détection instantanée basée sur les capacités du navigateur
      const detectPerformance = () => {
        const { hardwareConcurrency = 1, userAgent } = navigator;
        const { deviceMemory = 4, connection } = navigator as any;

        // Indicateurs de performance
        const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent.toLowerCase());
        const isOldBrowser = /msie|trident/i.test(userAgent.toLowerCase());
        const isSlowConnection =
          connection &&
          (connection.effectiveType === 'slow-2g' ||
            connection.effectiveType === '2g' ||
            connection.effectiveType === '3g');

        // Score de performance (0-100) - Moins restrictif
        let performanceScore = 100;

        // Réduction basée sur le nombre de cœurs - Moins strict
        if (hardwareConcurrency < 4) performanceScore -= 25;
        else if (hardwareConcurrency < 6) performanceScore -= 15;

        // Réduction basée sur la mémoire - Moins strict
        if (deviceMemory < 4) performanceScore -= 20;
        else if (deviceMemory < 6) performanceScore -= 10;

        // Réduction pour mobile - Moins strict
        if (isMobile) performanceScore -= 20;

        // Réduction pour ancien navigateur - Moins strict
        if (isOldBrowser) performanceScore -= 30;

        // Réduction pour connexion lente - Moins strict
        if (isSlowConnection) performanceScore -= 15;

        // Déterminer le niveau de performance
        let performanceLevel: PerformanceLevel;
        if (performanceScore >= 80) {
          performanceLevel = 'high';
        } else if (performanceScore >= 50) {
          performanceLevel = 'medium';
        } else {
          performanceLevel = 'low';
        }

        console.log('Performance detection:', {
          hardwareConcurrency,
          deviceMemory,
          isMobile,
          isOldBrowser,
          isSlowConnection,
          performanceScore,
          performanceLevel,
        });

        setMetrics({
          performanceLevel,
          performanceScore,
        });
      };

      detectPerformance();
    }
  }, []);

  console.log('metrics', metrics);

  return {
    ...metrics,
  };
};

export default usePerformance;
