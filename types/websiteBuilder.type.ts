import { ReactNode } from 'react';
import { Language } from './language.type';

export enum WEBSITE_BUILDER_STEPS {
  PAGES = 'PAGES',
  ANIMATIONS = 'ANIMATIONS',
  OPTIONS = 'OPTIONS',
  FINAL = 'FINAL',
}

export type Step = {
  title: Language;
  description: { en: ReactNode; fr: ReactNode };
  type: WEBSITE_BUILDER_STEPS;
  isActive: boolean;
  isCompleted: boolean;
};

export type Page = {
  id: string;
  title: Language;
  days: number;
  selected: boolean;
};

export type Animation = {
  title: Language;
  percent: number;
};

export type Option = {
  id: string;
  title: Language;
  days: number;
  selected: boolean;
};
