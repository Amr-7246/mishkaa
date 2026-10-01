import * as SecureStore from 'expo-secure-store';

let authToken: string | null = null;

export const getAuthToken = () => authToken;

export const setAuthToken = async (token: string) => {
  authToken = token;
  await SecureStore.setItemAsync('authToken', token);
};

export const clearAuthToken = async () => {
  authToken = null;
  await SecureStore.deleteItemAsync('authToken');
};

export const loadAuthToken = async () => {
  authToken = await SecureStore.getItemAsync('authToken');
};