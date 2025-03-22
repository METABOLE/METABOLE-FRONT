import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/')
      router.push(navigator.language.includes('fr') ? 'fr' : 'en', undefined, { shallow: true });
  }, []);

  return (
    <Head>
      <link key="canonical" href="https://test.test" rel="canonical" />
    </Head>
  );
}
