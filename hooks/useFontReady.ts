import { useEffect, useState } from 'react';

export function useFontReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.load('1rem "Safiro Bold"').then(() => {
      document.fonts.load('1rem "Safiro Bold Italic"').then(() => {
        document.fonts.load('1rem "Safiro Medium"').then(() => {
          document.fonts.load('1rem "Safiro Medium Italic"').then(() => {
            document.fonts.load('1rem "Safiro Regular"').then(() => {
              document.fonts.load('1rem "Safiro Regular Italic"').then(() => {
                document.fonts.load('1rem "Safiro SemiBold"').then(() => {
                  document.fonts.load('1rem "Safiro SemiBold Italic"').then(() => {
                    setReady(true);
                  });
                });
              });
            });
          });
        });
      });
    });
  }, []);

  return ready;
}
