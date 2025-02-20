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
    const newPath = isFrench ? '/fr' : '/en';

    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath.replace(/^\/(fr|en)/, `${newPath}`), {
      shallow: true,
    });
  };

  const getInternalPath = (path: string): string => {
    const locale = isFrench ? 'fr' : 'en';

    if (path === '/') {
      return `/${locale}`;
    }

    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  useEffect(() => {
    _setIsFrench(router.query.lang === 'fr');
  }, []);

  return (
    <LanguageContext.Provider value={{ isFrench, setIsFrench, getInternalPath }}>
      {children}
    </LanguageContext.Provider>
  );
};
