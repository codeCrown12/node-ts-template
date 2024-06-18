import axios, { AxiosResponse, AxiosError } from 'axios';
import { logger } from '../lib/logger';

export const api = axios.create();

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.data) {
      logger.error(`[EXTERNAL API ERROR PAYLOAD]: ${JSON.stringify(error.response.data)}`);
    }
    return Promise.reject(error);
  }
);
