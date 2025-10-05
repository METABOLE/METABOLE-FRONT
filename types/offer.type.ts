export enum OFFER_TYPE {
  WEBSITE = 'WEBSITE',
  ONE_PAGE = 'ONE_PAGE',
  WEB_EXPERIENCE = 'WEB_EXPERIENCE',
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
