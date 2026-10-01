import '@/global.css';

import { NAV_THEME } from '@/src/lib/theme';
import { ThemeProvider } from 'expo-router/react-navigation';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View className="min-h-[60px] w-[90%] flex-row-reverse items-center rounded-xl border border-success bg-foreground px-4 py-3 shadow-lg">
      <View className="flex-1 items-end px-2">
        <Text className="text-right text-base font-bold text-text">{text1}</Text>
        {text2 && <Text className="text-text-inactive mt-0.5 text-right text-xs">{text2}</Text>}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <View className="min-h-[60px] w-[90%] flex-row-reverse items-center rounded-xl border border-error bg-foreground px-4 py-3 shadow-lg">
      <View className="flex-1 items-end px-2">
        <Text className="text-right text-base font-bold text-text">{text1}</Text>
        {text2 && <Text className="text-text-inactive mt-0.5 text-right text-xs">{text2}</Text>}
      </View>
    </View>
  ),

  info: ({ text1, text2 }: BaseToastProps) => (
    <View className="min-h-[60px] w-[90%] flex-row-reverse items-center rounded-xl border border-info bg-foreground px-4 py-3 shadow-lg">
      <View className="flex-1 items-end px-2">
        <Text className="text-right text-base font-bold text-text">{text1}</Text>
        {text2 && <Text className="text-text-inactive mt-0.5 text-right text-xs">{text2}</Text>}
      </View>
    </View>
  ),
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack />
          <PortalHost />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
