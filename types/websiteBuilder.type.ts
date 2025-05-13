export enum WEBSITE_BUILDER_STEPS {
  PAGES = 'PAGES',
  ANIMATIONS = 'ANIMATIONS',
  OPTIONS = 'OPTIONS',
}

export type Page = {
  id: string;
  title: { en: string; fr: string };
  pricing: number;
  selected: boolean;
};

export type Animation = {
  title: { en: string; fr: string };
  pricing: number;
};

export type Option = {
  id: string;
  title: { en: string; fr: string };
  pricing: number;
  selected: boolean;
};
