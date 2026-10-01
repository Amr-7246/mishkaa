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
import { Pressable, TextInput, View } from 'react-native';
import { usePost } from '../../hooks/api/useBaseCrud';
import { useRouter } from 'expo-router';
import { Routes, Screens } from '../../constants/Routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { RegisterFields, registerSchema } from '../../validation/auth';

export function SignUpForm() {
  const router = useRouter();

  //~ React Hook Form Configs
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterFields>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    mode: 'onChange',
  });

  const { mutate, isPending } = usePost<Omit<RegisterFields, 'confirmPassword'>>(Routes.REGISTER, {
    successMessage: 'Account created successfully!',
    invalidateKeys: [['auth'], ['user']],
    onSuccess: () => {
      reset();
      router.replace(Screens.HOME);
    },
  });

  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);
  const firstNameInputRef = React.useRef<TextInput>(null);
  const lastNameInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);

  const onSubmit = (data: RegisterFields) => {
    // Transform form data to match API expectations
    const signUpData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    mutate(signUpData);
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={firstNameInputRef}
                    id="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={() => {
                      lastNameInputRef.current?.focus();
                    }}
                    returnKeyType="next"
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.firstName && (
                <Text className="text-sm text-destructive">{errors.firstName.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={lastNameInputRef}
                    id="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                    returnKeyType="next"
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.lastName && (
                <Text className="text-sm text-destructive">{errors.lastName.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={emailInputRef}
                    id="email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                    returnKeyType="next"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-sm text-destructive">{errors.email.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="password">Password</Label>
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
                    onSubmitEditing={() => {
                      confirmPasswordInputRef.current?.focus();
                    }}
                    returnKeyType="next"
                    className={errors.password ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-sm text-destructive">{errors.password.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                    onSubmitEditing={() => handleSubmit(onSubmit)}
                    returnKeyType="send"
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
              disabled={isPending || !isValid}>
              <Text>{isPending ? 'Creating account...' : 'Continue'}</Text>
            </Button>
          </View>

          <Text className="text-center text-sm">
            Already have an account?{' '}
            <Pressable
              onPress={() => {
                router.replace(Screens.LOGIN);
              }}>
              <Text className="text-sm underline underline-offset-4">Sign in</Text>
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
