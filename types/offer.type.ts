export enum OFFER_TYPE {
  LANDING = 'LANDING',
  SIMPLE = 'SIMPLE',
  CUSTOM = 'CUSTOM',
}

export type Offer = {
  type: OFFER_TYPE;
  title: {
    en: string;
    fr: string;
  };
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
