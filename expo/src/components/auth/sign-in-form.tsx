import { SocialConnections } from '@/src/components/auth/social-connections';
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
import { Separator } from '@/src/components/ui/separator';
import { Text } from '@/src/components/ui/text';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';
import { usePost } from '../../hooks/api/useBaseCrud';
import { useRouter } from 'expo-router';
import { Routes, Screens } from '../../constants/Routes';
import { useForm as useHookForm, Controller, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFields, LoginResponse, loginSchema } from '../../validation/auth';

export function SignInForm() {
  const router = useRouter();
  //~ React Hook Form Configs
  const {
    control,
    handleSubmit,
    formState: { errors }, //! Nesting Destructuring syntax. errors as a result
    reset,
  } = useHookForm<LoginFields>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginFields>,
    defaultValues: { email: '', pass: '' },
  });

  //~ The general CRUD ops
  const { mutate, isPending } = usePost<LoginFields, LoginResponse>(Routes.LOGIN, {
    successMessage: 'تم تسجيلك بنجاح!',
    invalidateKeys: [['courses'], ['my-profile']],
    onSuccess: () => {
      reset();
      router.replace(Screens.HOME);
    },
  });

  const passwordInputRef = React.useRef<TextInput>(null);

  function onSubmit(formData: LoginFields) {
    mutate(formData);
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Sign in to your app</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            {/* //~ email */}
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={() => {
                      onChange();
                    }}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    returnKeyType="next"
                    submitBehavior="submit"
                  />
                )}
              />
              {errors.email && <Text className="text-warning">{errors.email.message}</Text>}
            </View>

            {/* //~ password */}
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">كلمة السر</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
                  <Text className="font-normal leading-4">مش فاكر كلمة السر?</Text>
                </Button>
              </View>
              <Controller
                control={control}
                name="pass"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={passwordInputRef}
                    value={value}
                    onBlur={onBlur} //! to make validation runs only after they leave the field
                    onChangeText={onChange}
                    placeholder="كلمة المرور"
                    secureTextEntry
                    onSubmitEditing={() => handleSubmit(onSubmit)}
                    id="password"
                    returnKeyType="join"
                  />
                )}
              />
              {errors.pass && <Text className="text-warning">{errors.pass.message}</Text>}
            </View>

            <Button className="w-full" onPress={() => handleSubmit(onSubmit)} disabled={isPending}>
              <Text>{isPending ? 'بنحمل . . ' : 'نسجل'}</Text>
            </Button>
          </View>
          <Text className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Pressable
              onPress={() => {
                router.replace(Screens.REGISTER);
              }}>
              <Text className="text-sm underline underline-offset-4">Sign up</Text>
            </Pressable>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
