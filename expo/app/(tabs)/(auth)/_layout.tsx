import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

export default function AuthLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-1 bg-background">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: 'transparent' },
        }}>
        <Stack.Screen
          name="login"
          options={{
            title: 'تسجيل الدخول',
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: 'إنشاء حساب',
          }}
        />
        <Stack.Screen name="forgot-password" options={{ title: 'نسيت كلمة المرور' }} />
        <Stack.Screen name="reset-password" options={{ title: 'إعادة تعيين كلمة المرور' }} />
        <Stack.Screen name="verify-email" options={{ title: 'تحقق من البريد الإلكتروني' }} />
        <Stack />
      </Stack>
    </View>
  );
}
