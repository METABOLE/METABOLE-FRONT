import { ReactNode } from 'react';

export interface TeamMember {
  name: string;
  role: {
    fr: string;
    en: string;
  };
  description: {
    fr: ReactNode;
    en: ReactNode;
  };
  image: string;
  website: string;
  alt: string;
}
