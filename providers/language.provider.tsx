import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LanguageContextType {
  isFrench: boolean;
  setIsFrench: (isFrench: boolean) => void;
  getInternalPath: (path: string) => string;
  getChangeLanguagePath: (isFrench: boolean) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  isFrench: true,
  setIsFrench: () => {},
  getInternalPath: (path) => path,
  getChangeLanguagePath: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isFrench, _setIsFrench] = useState(true);

  const setIsFrench = (isFrench: boolean) => {
    const pathWithoutLang = router.asPath.replace(/^\/(fr|en)/, '');

    const newFullPath = `/${isFrench ? 'fr' : 'en'}${pathWithoutLang}`;

    router.push(newFullPath, undefined, { shallow: false });
  };

  const getInternalPath = (path: string): string => {
    const locale = isFrench ? 'fr' : 'en';

    if (path === '/') {
      return `/${locale}`;
    }

    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const getChangeLanguagePath = (isFrench: boolean): string => {
    const pathWithoutLang = router.asPath.replace(/^\/(fr|en)/, '');
    return `/${isFrench ? 'fr' : 'en'}${pathWithoutLang}`;
  };

  useEffect(() => {
    if (router.query.lang !== 'en' && router.query.lang !== 'fr') {
      router.push('/404');
      return;
    }

    _setIsFrench(router.query.lang === 'fr');
  }, []);

  return (
    <LanguageContext.Provider
      value={{ isFrench, setIsFrench, getInternalPath, getChangeLanguagePath }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
