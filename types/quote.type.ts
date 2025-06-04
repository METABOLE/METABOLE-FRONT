import { ReactNode } from 'react';
import { Language } from './language.type';

export enum QUOTE_STEPS {
  PAGES = 'PAGES',
  ANIMATIONS = 'ANIMATIONS',
  OPTIONS = 'OPTIONS',
  FINAL = 'FINAL',
}

export enum QUOTE_ANIMATIONS {
  LIGHT = 'LIGHT',
  IMMERSIVES = 'IMMERSIVES',
  ADVANCED = 'ADVANCED',
}

export type Step = {
  title: Language;
  description: { en: ReactNode; fr: ReactNode };
  type: QUOTE_STEPS;
  isActive: boolean;
  isCompleted: boolean;
};

export type Page = {
  id: string;
  title: Language;
  selected: boolean;
};

export type Animation = {
  type: QUOTE_ANIMATIONS;
  title: Language;
};

export type Option = {
  id: string;
  title: Language;
  selected: boolean;
};

export interface StepFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface StepState {
  id: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  devis: {
    pages: string[];
    options: string[];
    animation: string;
  };
  lang?: 'fr' | 'en';
}
