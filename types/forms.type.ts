export enum FORM_STATUS {
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

export interface FormWebsiteBuilderData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
