import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Text } from '@/src/components/ui/text';
import * as React from 'react';
import { type TextStyle, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailFields, verifyEmailSchema } from '@/src/validation/auth';
import { usePost } from '@/src/hooks/api/useBaseCrud';
import { useRouter } from 'expo-router';
import { Routes, Screens } from '@/src/constants/Routes';

const RESEND_CODE_INTERVAL_SECONDS = 30;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TABULAR_NUMBERS_STYLE: TextStyle = { fontVariant: ['tabular-nums'] };

export function VerifyEmailForm() {
  const router = useRouter();
  const { countdown, restartCountdown } = useCountdown(RESEND_CODE_INTERVAL_SECONDS);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<VerifyEmailFields>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
    mode: 'onChange',
  });

  const { mutate, isPending } = usePost<VerifyEmailFields>(Routes.VERIFY_EMAIL, {
    successMessage: 'تم التحقق من بريدك الإلكتروني بنجاح',
    onSuccess: () => {
      reset();
      router.replace(Screens.HOME);
    },
  });

  const { mutate: resendCode, isPending: isResending } = usePost<{ email: string }>(
    '/auth/resend-verification',
    {
      successMessage: 'تم إعادة إرسال رمز التحقق',
      onSuccess: () => {
        restartCountdown();
      },
    }
  );

  const onSubmit = (data: VerifyEmailFields) => {
    mutate(data);
  };

  const handleResendCode = () => {
    // Get email from storage or context
    const email = 'user@example.com'; // Replace with actual email
    resendCode({ email });
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 pb-4 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            تحقق من بريدك الإلكتروني
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            أدخل رمز التحقق المرسل إلى بريدك الإلكتروني
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="code">رمز التحقق</Label>
              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="code"
                    placeholder="أدخل رمز التحقق"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    autoComplete="sms-otp"
                    textContentType="oneTimeCode"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit(onSubmit)}
                    className={errors.code ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.code && (
                <Text className="text-sm text-destructive">{errors.code.message}</Text>
              )}

              <Button
                variant="link"
                size="sm"
                disabled={countdown > 0 || isResending}
                onPress={handleResendCode}
                className="mt-2">
                <Text className="text-center text-xs">
                  {isResending
                    ? 'جاري الإرسال...'
                    : countdown > 0
                      ? `إعادة إرسال الرمز (${countdown})`
                      : 'لم تصلك الرسالة؟ إعادة إرسال الرمز'}
                </Text>
              </Button>
            </View>

            <View className="gap-3">
              <Button
                className="w-full"
                onPress={() => handleSubmit(onSubmit)}
                disabled={isPending || !isValid || !isDirty}>
                <Text>{isPending ? 'جاري التحقق...' : 'متابعة'}</Text>
              </Button>

              <Button
                variant="link"
                className="mx-auto"
                onPress={() => {
                  router.replace(Screens.LOGIN);
                }}>
                <Text>إلغاء</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function useCountdown(seconds = 30) {
  const [countdown, setCountdown] = React.useState(seconds);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stopCountdown = React.useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCountdown = React.useCallback(() => {
    stopCountdown();
    setCountdown(seconds);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopCountdown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [seconds, stopCountdown]);

  React.useEffect(() => {
    startCountdown();
    return stopCountdown;
  }, [startCountdown, stopCountdown]);

  return { countdown, restartCountdown: startCountdown };
}
