import { Platform, View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { usePost } from '@/src/hooks/api/useBaseCrud';
import { toast } from '@/src/lib/toast';
import { Routes } from '@/src/constants/Routes';
import { useRouter } from 'expo-router';
import { useSocialAuth } from '@/src/hooks/useSocialAuth';

const SOCIAL_CONNECTION_STRATEGIES = [
  {
    type: 'google',
    label: 'جوجل',
    source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
    useTint: false,
    bgColor: 'bg-white',
  },
  {
    type: 'facebook',
    label: 'فيسبوك',
    source: { uri: 'https://img.clerk.com/static/facebook.png?width=160' },
    useTint: false,
    bgColor: 'bg-[#1877F2]',
  },
  {
    type: 'apple',
    label: 'آبل',
    source: { uri: 'https://img.clerk.com/static/apple.png?width=160' },
    useTint: true,
    bgColor: Platform.select({ ios: 'bg-black', android: 'bg-white' }),
  },
] as const;

type SocialProvider = (typeof SOCIAL_CONNECTION_STRATEGIES)[number]['type'];

interface SocialAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export function SocialConnections() {
  const { login } = useAuth();
  const router = useRouter();

  const { mutate } = usePost<{ provider: SocialProvider; token: string }>('/auth/social', {
    onSuccess: (data: SocialAuthResponse) => {
      login(data.token, data.user);
      toast.show('success', 'تم تسجيل الدخول بنجاح');
      router.replace(Routes.HOME);
    },
  });

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      const { authenticate } = useSocialAuth(provider);
      const token = await authenticate();

      if (token) {
        mutate({ provider, token });
      }
    } catch (error) {
      toast.show('error', 'فشل تسجيل الدخول', {
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
      });
    }
  };

  return (
    <View className="gap-3">
      <View className="flex-row justify-center gap-3">
        {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
          // ... rendering code
        })}
      </View>

      {/* Terms and conditions */}
      <Text className="mt-2 text-center text-xs text-muted-foreground">
        بالتسجيل أنت توافق على <Text className="text-primary underline">شروط الخدمة</Text>
        {' و '}
        <Text className="text-primary underline">سياسة الخصوصية</Text>
      </Text>
    </View>
  );
}

// Optional: Social authentication utilities
export async function authenticateWithProvider(provider: SocialProvider) {
  // Implementation depends on your authentication library
  // For Expo:
  // import * as Google from 'expo-auth-session/providers/google';
  // import * as Facebook from 'expo-auth-session/providers/facebook';
  // import * as Apple from 'expo-auth-session/providers/apple';

  switch (provider) {
    case 'google':
      // Implement Google OAuth
      break;
    case 'facebook':
      // Implement Facebook OAuth
      break;
    case 'apple':
      // Implement Apple OAuth
      break;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
