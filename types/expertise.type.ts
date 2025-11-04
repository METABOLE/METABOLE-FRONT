import type { Language } from './language.type';

export type ExpertiseItem = Language;

export type ExpertiseCategory = Language & {
  img: string;
};

export type Expertise = {
  category: ExpertiseCategory;
  description: Language;
  items: ExpertiseItem[];
};
