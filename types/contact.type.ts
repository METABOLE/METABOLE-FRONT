import { OFFER_TYPE } from './offer.type';

export const CONTACT_TYPE_VALUES = {
  DEFAULT: 'DEFAULT',
  ...OFFER_TYPE,
  OTHER: 'OTHER',
} as const;

export type ContactType = (typeof CONTACT_TYPE_VALUES)[keyof typeof CONTACT_TYPE_VALUES];

export interface ContactFormData {
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  type: ContactType;
  consentMarketing: boolean;
  lang: 'fr' | 'en';
}

export type ContactFormState = Omit<ContactFormData, 'lang'>;
