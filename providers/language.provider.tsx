import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LanguageContextType {
  isFrench: boolean;
  setIsFrench: (isFrench: boolean) => void;
  getInternalPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  isFrench: true,
  setIsFrench: () => {},
  getInternalPath: (path) => path,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isFrench, _setIsFrench] = useState(true);

  const setIsFrench = (isFrench: boolean) => {
    _setIsFrench(isFrench);
    const newLocale = isFrench ? 'fr' : 'en';

    // Récupère le chemin actuel sans le préfixe de langue
    const currentPath = router.asPath.replace(/^\/(fr|en)/, '');
    const newPath = `/${newLocale}${currentPath || ''}`;

    router.push(newPath);
  };

  const getInternalPath = (path: string): string => {
    const locale = isFrench ? 'fr' : 'en';

    if (path === '/') {
      return `/${locale}`;
    }

    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  useEffect(() => {
    // Détecter la langue à partir du chemin URL actuel
    const pathSegments = router.asPath.split('/').filter(Boolean);
    const isCurrentPathFrench = pathSegments[0] === 'fr';

    _setIsFrench(isCurrentPathFrench);
  }, [router.asPath]);

  // Redirection initiale basée sur la langue du navigateur
  useEffect(() => {
    // Ne rediriger que si nous sommes sur la page racine
    if (router.pathname === '/') {
      const userLanguage = navigator.language || (navigator as any).userLanguage;
      const shouldUseFrench = userLanguage.startsWith('fr');
      const locale = shouldUseFrench ? 'fr' : 'en';

      router.replace(`/${locale}`);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ isFrench, setIsFrench, getInternalPath }}>
      {children}
    </LanguageContext.Provider>
  );
};
