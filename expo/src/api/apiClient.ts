/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import axios, { InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { getAuthToken } from './authToken';

//& Root api layer
const apiClient = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : (process.env.EXPO_PUBLIC_API_URL as string),
  timeout: 15000, // 15 seconds timeout
  headers: {
    Accept: 'application/json',
  },
});

//& REQUEST: attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//& Response: error normalize + global 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      const { clearAuthToken } = await import('./authToken');
      await clearAuthToken();
    }
    return Promise.reject(error);
  }
);
export default apiClient;
