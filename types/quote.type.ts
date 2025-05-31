interface Quote {
  pages: string[];
  options: string[];
  animation: string;
  totalPrice: number;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  devis: Quote;
  lang?: 'fr' | 'en';
}
