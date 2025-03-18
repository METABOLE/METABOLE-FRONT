import { DocumentProps, Html, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  const isFrench = props.__NEXT_DATA__.query.lang === 'fr';

  return (
    <Html lang={isFrench ? 'fr' : 'en'}>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
