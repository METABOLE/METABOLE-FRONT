import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { type ReactElement, type ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>;
}
