import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  const isFrench = props.__NEXT_DATA__.query.lang === 'fr';

  return (
    <Html lang={isFrench ? 'fr' : 'en'}>
      <Head>
        <meta
          name="description"
          content={
            isFrench
              ? "Studio créatif digital spécialisé dans l'identité de marque, le design et le développement web. Nous créons des expériences numériques sur-mesure qui captivent et engagent."
              : 'Creative digital studio specializing in brand identity, design and web development. We craft bespoke digital experiences that captivate and engage.'
          }
        />
        <meta
          content="Creative studio, Studio Créatif, Digital Studio, Studio Digital, Brand Identity, Identité de Marque, Design, Développement Web, Web Development, Digital Experience, Expérience Numérique, Captivate, Engage, Captiver, Engager"
          name="keywords"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
