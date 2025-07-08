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

        // Détection plus précise des appareils
        const userAgentLower = userAgent.toLowerCase();
        const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgentLower);
        const isIOS = /iphone|ipad|ipod/i.test(userAgentLower);
        const isAndroid = /android/i.test(userAgentLower);
        const isOldBrowser = /msie|trident/i.test(userAgentLower);
        const isSlowConnection =
          connection &&
          (connection.effectiveType === 'slow-2g' ||
            connection.effectiveType === '2g' ||
            connection.effectiveType === '3g');

        // Détection des appareils modernes
        const isModernMobile =
          isIOS ||
          (isAndroid && /android [8-9]|android 1[0-9]|android 2[0-9]/i.test(userAgentLower));
        const isHighEndMobile = isIOS || /samsung|google pixel|oneplus/i.test(userAgentLower);

        // Score de performance (0-100) - Ajusté pour les appareils modernes
        let performanceScore = 100;

        // Réduction basée sur le nombre de cœurs - Différencié mobile/desktop
        if (isMobile) {
          // Sur mobile, les processeurs sont optimisés différemment
          if (hardwareConcurrency < 2) performanceScore -= 15;
          else if (hardwareConcurrency < 4) performanceScore -= 8;
          else if (hardwareConcurrency < 6) performanceScore -= 5;
        } else {
          // Sur desktop, on est plus strict
          if (hardwareConcurrency < 4) performanceScore -= 25;
          else if (hardwareConcurrency < 6) performanceScore -= 15;
        }

        // Réduction basée sur la mémoire - Différencié mobile/desktop
        if (isMobile) {
          // Sur mobile, la mémoire est généralement plus limitée mais optimisée
          if (deviceMemory < 2) performanceScore -= 20;
          else if (deviceMemory < 4) performanceScore -= 10;
          else if (deviceMemory < 6) performanceScore -= 5;
        } else {
          // Sur desktop, on est plus strict
          if (deviceMemory < 4) performanceScore -= 20;
          else if (deviceMemory < 6) performanceScore -= 10;
        }

        // Bonus pour les appareils modernes
        if (isModernMobile) performanceScore += 10;
        if (isHighEndMobile) performanceScore += 5;

        // Réduction pour ancien navigateur
        if (isOldBrowser) performanceScore -= 30;

        // Réduction pour connexion lente
        if (isSlowConnection) performanceScore -= 15;

        // Bonus pour iOS (généralement très optimisé)
        if (isIOS) performanceScore += 15;

        // Limiter le score à 100 maximum
        performanceScore = Math.min(performanceScore, 100);

        // Déterminer le niveau de performance - Seuils ajustés pour mobile
        let performanceLevel: PerformanceLevel;
        if (isMobile) {
          // Seuils plus bas pour mobile car les appareils modernes sont très optimisés
          if (performanceScore >= 70) {
            performanceLevel = 'high';
          } else if (performanceScore >= 40) {
            performanceLevel = 'medium';
          } else {
            performanceLevel = 'low';
          }
        } else {
          // Seuils plus élevés pour desktop
          if (performanceScore >= 80) {
            performanceLevel = 'high';
          } else if (performanceScore >= 50) {
            performanceLevel = 'medium';
          } else {
            performanceLevel = 'low';
          }
        }

        console.log('Performance detection:', {
          hardwareConcurrency,
          deviceMemory,
          isMobile,
          isIOS,
          isAndroid,
          isModernMobile,
          isHighEndMobile,
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
