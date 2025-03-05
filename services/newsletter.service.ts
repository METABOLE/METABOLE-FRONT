import { ContactData } from '@/types/contact.type';
import { instance } from './config';
import { NewsletterSubscribeData, NewsletterUnsubscribeData } from '@/types/newsletter.type';

export const postUnsubscribeNewsletter = async (formData: NewsletterUnsubscribeData) => {
  try {
    const response = await instance.post<NewsletterUnsubscribeData>(
      '/newsletter/unsubscribe',
      formData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }
    throw new Error('An unknown error occurred while submitting the contact form');
  }
};

export const postSubscribeNewsletter = async (formData: ContactData) => {
  try {
    const response = await instance.post<NewsletterSubscribeData>(
      '/newsletter/subscribe',
      formData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }
    throw new Error('An unknown error occurred while submitting the contact form');
  }
};
