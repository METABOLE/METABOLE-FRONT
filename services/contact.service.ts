import { ContactData } from '@/types/contact.type';
import { instance } from './config';

export const postContactForm = async (formData: ContactData) => {
  try {
    const response = await instance.post<ContactData>('/contact/send', formData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }
    throw new Error('An unknown error occurred while submitting the contact form');
  }
};
