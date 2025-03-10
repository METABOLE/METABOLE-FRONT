export interface ContactFormData {
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  consentMarketing: boolean;
  lang: 'fr' | 'en';
}
