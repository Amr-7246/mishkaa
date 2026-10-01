import { z } from 'zod';

//~ REGISTER DATA TYPES
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل')
      .max(50, 'الاسم الأول يجب أن يكون أقل من 50 حرف')
      .regex(
        /^[a-zA-Z\u0600-\u06FF\s-]+$/,
        'الاسم الأول يمكن أن يحتوي على حروف ومسافات وشرطات فقط'
      ),

    lastName: z
      .string()
      .min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل')
      .max(50, 'الاسم الأخير يجب أن يكون أقل من 50 حرف')
      .regex(
        /^[a-zA-Z\u0600-\u06FF\s-]+$/,
        'الاسم الأخير يمكن أن يحتوي على حروف ومسافات وشرطات فقط'
      ),

    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .email('صيغة البريد الإلكتروني غير صحيحة')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'صيغة البريد الإلكتروني غير صحيحة'
      ),

    password: z
      .string()
      .min(8, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل')
      .regex(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل')
      .regex(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل')
      .regex(/[0-9]/, 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل')
      .regex(/[^A-Za-z0-9]/, 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل')
      .max(50, 'كلمة المرور يجب أن تكون أقل من 50 حرف'),

    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'], //! This attaches the error message directly to the confirmPassword field UI
  });

export type RegisterFields = z.infer<typeof registerSchema>;
//TODO: modify that acording to the backend res
export interface RegisterResponse {
  id: string;
  email: string;
  token: string;
}

//~ LOGIN DATA TYPES
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('صيغة البريد الإلكتروني غير صحيحة')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'صيغة البريد الإلكتروني غير صحيحة'),

  pass: z
    .string()
    .min(8, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل')
    .regex(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل')
    .regex(/[0-9]/, 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل')
    .regex(/[^A-Za-z0-9]/, 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل')
    .max(50, 'كلمة المرور يجب أن تكون أقل من 50 حرف'),
});

export type LoginFields = z.infer<typeof loginSchema>;
//TODO: modify that acording to the backend res
export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}
// ~ FORGOT PASSWORD
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('صيغة البريد الإلكتروني غير صحيحة'),
});

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

// ~ RESET PASSWORD
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'رمز التحقق مطلوب'),
    password: z
      .string()
      .min(8, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل')
      .regex(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل')
      .regex(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل')
      .regex(/[0-9]/, 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل')
      .regex(/[^A-Za-z0-9]/, 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل'),
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;

// ~ VERIFY EMAIL
export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, 'رمز التحقق يجب أن يكون 6 أرقام')
    .max(6, 'رمز التحقق يجب أن يكون 6 أرقام')
    .regex(/^\d+$/, 'رمز التحقق يجب أن يحتوي على أرقام فقط'),
});

export type VerifyEmailFields = z.infer<typeof verifyEmailSchema>;
