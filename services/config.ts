import { config } from '@/config';
import axios from 'axios';

export const instance = axios.create({
  baseURL: config.api.baseUrl + '/v1/',
  headers: {
    'x-api-key': config.api.key,
    'Content-Type': 'application/json',
  },
  // Permettre aux cookies et aux en-têtes d'authentification d'être inclus
  withCredentials: false,
});

// Ajouter un intercepteur pour les requêtes
instance.interceptors.request.use(
  (request) => {
    console.log('Request:', request.method, request.url);
    console.log('Request headers:', request.headers);
    return request;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// Ajouter un intercepteur pour les réponses
instance.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error headers:', error.response.headers);
      console.log('Error data:', error.response.data);
    }
    return Promise.reject(error);
  },
);
