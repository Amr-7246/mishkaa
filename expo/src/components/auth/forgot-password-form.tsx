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
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFields, forgotPasswordSchema } from '@/src/validation/auth';
import { usePost } from '@/src/hooks/api/useBaseCrud';
import { useRouter } from 'expo-router';
import { Routes, Screens } from '@/src/constants/Routes';

export function ForgotPasswordForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ForgotPasswordFields>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  const { mutate, isPending } = usePost<ForgotPasswordFields>(Routes.FORGOT_PASS, {
    successMessage: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
    onSuccess: () => {
      router.push(Screens.RESET_PASSWORD);
    },
  });

  const onSubmit = (data: ForgotPasswordFields) => {
    mutate(data);
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">نسيت كلمة المرور؟</CardTitle>
          <CardDescription className="text-center sm:text-left">
            أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="email"
                    placeholder="example@domain.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit(onSubmit)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-sm text-destructive">{errors.email.message}</Text>
              )}
            </View>

            <Button
              className="w-full"
              onPress={() => handleSubmit(onSubmit)}
              disabled={isPending || !isValid || !isDirty}>
              <Text>{isPending ? 'جاري الإرسال...' : 'إعادة تعيين كلمة المرور'}</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
