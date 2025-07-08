import { Language } from './language.type';

export type QuestionType = {
  id: number;
  question: Language;
  answer: Language;
  link?: {
    url: string;
    text: Language;
  };
};
