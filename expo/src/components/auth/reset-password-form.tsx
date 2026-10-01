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
import { TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFields, resetPasswordSchema } from '@/src/validation/auth';
import { usePost } from '@/src/hooks/api/useBaseCrud';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Routes, Screens } from '@/src/constants/Routes';

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useLocalSearchParams<{ token?: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: params.token || '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { mutate, isPending } = usePost<ResetPasswordFields>(Routes.RESET_PASS, {
    successMessage: 'تم إعادة تعيين كلمة المرور بنجاح',
    onSuccess: () => {
      reset();
      router.replace(Screens.LOGIN);
    },
  });

  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);

  const onSubmit = (data: ResetPasswordFields) => {
    mutate(data);
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            إعادة تعيين كلمة المرور
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            أدخل رمز التحقق وكلمة المرور الجديدة
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="token">رمز التحقق</Label>
              <Controller
                control={control}
                name="token"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="token"
                    placeholder="أدخل رمز التحقق"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    autoComplete="sms-otp"
                    textContentType="oneTimeCode"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    className={errors.token ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.token && (
                <Text className="text-sm text-destructive">{errors.token.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="password">كلمة المرور الجديدة</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-sm text-destructive">{errors.password.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={confirmPasswordInputRef}
                    id="confirmPassword"
                    secureTextEntry
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit(onSubmit)}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-sm text-destructive">{errors.confirmPassword.message}</Text>
              )}
            </View>

            <Button
              className="w-full"
              onPress={() => handleSubmit(onSubmit)}
              disabled={isPending || !isValid || !isDirty}>
              <Text>{isPending ? 'جاري إعادة التعيين...' : 'إعادة تعيين كلمة المرور'}</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
