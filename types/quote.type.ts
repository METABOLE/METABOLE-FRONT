interface Quote {
  pages: string[];
  options: string[];
  animation: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  devis: Quote;
  lang?: 'fr' | 'en';
}
export interface StepState {
  id: string;
  isActive: boolean;
  isCompleted: boolean;
}
