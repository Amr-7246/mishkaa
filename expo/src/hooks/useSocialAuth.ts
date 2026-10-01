import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Apple from 'expo-auth-session/providers/apple';
import { Platform } from 'react-native';

export function useSocialAuth(provider: 'google' | 'facebook' | 'apple') {
  // Google
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID!,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID!,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
  });

  // Facebook
  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID!,
  });

  // Apple (iOS only)
  const [appleRequest, appleResponse, applePromptAsync] = Apple.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_APPLE_CLIENT_ID!,
  });

  const getAuth = () => {
    switch (provider) {
      case 'google':
        return { request: googleRequest, response: googleResponse, prompt: googlePromptAsync };
      case 'facebook':
        return {
          request: facebookRequest,
          response: facebookResponse,
          prompt: facebookPromptAsync,
        };
      case 'apple':
        return { request: appleRequest, response: appleResponse, prompt: applePromptAsync };
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  };

  const authenticate = async () => {
    const { request, prompt } = getAuth();

    if (!request) {
      throw new Error('Authentication request not ready');
    }

    const result = await prompt();

    if (result?.type === 'success') {
      return result.params.access_token;
    } else if (result?.type === 'error') {
      throw new Error(result.params.error_description || 'Authentication failed');
    } else {
      throw new Error('Authentication cancelled');
    }
  };

  return {
    authenticate,
    isLoading: !getAuth().request,
  };
}
