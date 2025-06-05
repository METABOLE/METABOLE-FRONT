import { QuoteFormData } from '@/types/quote.type';
import { instance } from './config';

export const postQuoteForm = async (formData: QuoteFormData) => {
  try {
    const response = await instance.post<QuoteFormData>('/quote', formData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to submit quote form: ${error.message}`);
    }
    throw new Error('An unknown error occurred while submitting the quote form');
  }
};
