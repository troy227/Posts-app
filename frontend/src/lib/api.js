import axios from 'axios';
import { getUserId } from '@/lib/user-id.js';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const userId = getUserId();
  if (userId != null) {
    config.headers.set('x-user-id', String(userId));
  }
  return config;
});
