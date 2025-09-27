import { ReactNode } from 'react';
import { Language } from './language.type';

export type QuestionType = {
  id: number;
  question: Language;
  answer: {
    en: ReactNode;
    fr: ReactNode;
  };
  link?: {
    url: string;
    text: Language;
  };
};
