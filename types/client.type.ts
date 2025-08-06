import { Language } from './language.type';

export type ClientType = {
  id: number;
  name: string;
  image: string;
  link?: {
    url: string;
    text: Language;
  };
};
