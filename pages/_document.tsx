import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  const isFrench = props.__NEXT_DATA__.query.lang === 'fr';
  const descriptionEn =
    'Metabole STUDIO is a creative studio based in Paris, France, founded by Matteo COURQUIN and Jérôme BEZEAU. We create unique web experiences for brands and agencies.';
  const descriptionFr =
    'Metabole STUDIO est un studio créatif basé à Paris, France, fondé par Matteo COURQUIN et Jérôme BEZEAU. Nous créons des expériences web uniques pour les marques et les agences.';

  return (
    <Html lang={isFrench ? 'fr' : 'en'}>
      <Head>
        <meta content={isFrench ? descriptionFr : descriptionEn} name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
