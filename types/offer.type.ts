export enum OFFER_TYPE {
  LANDING = 'landing',
  SIMPLE = 'simple',
  CUSTOM = 'custom',
}

export type Offer = {
  type: OFFER_TYPE;
  title: {
    en: string;
    fr: string;
  };
  startingPrice: string;
  options: {
    title: {
      en: string;
      fr: string;
    };
  }[];
  delivery: {
    title: {
      en: string;
      fr: string;
    };
    description: {
      en: string;
      fr: string;
    };
  };
  href: string;
};
