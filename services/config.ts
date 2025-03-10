import { config } from '@/config';
import axios from 'axios';

export const instance = axios.create({
  baseURL: config.api.baseUrl + '/dev/v1/',
});
