export const Routes = {
  //~ AUTH ROUTES
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  FORGOT_PASS: '/auth/forgot-password',
  RESET_PASS: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',

  //~ MAIN ROUTES
  HOME: '/',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  //~ media routes
  VIDEO_UPLOAD: '/media/upload-link',

  //~ courses routes
  userCourses: '/courses/user-courses',
  courseCurriculum: '/courses/curriculum',
  courseLessons: '/courses/lessons',
  homeList: '/courses/home',
  addCourse: '/courses/create',

  teacherProfile: '/teacher/profile',
} as const;

export const Screens = {
  //~ Auth Routes
  LOGIN: '/(auth)/login',
  REGISTER: '/(auth)/register',
  FORGOT_PASSWORD: '/(auth)/forgot-password',
  RESET_PASSWORD: '/(auth)/reset-password',
  VERIFY_EMAIL: '/(auth)/verify-email',

  //~ Main Routes
  HOME: '/(main)',
  PROFILE: '/(main)/profile',
  SETTINGS: '/(main)/settings',
  teacherProfile: 'teacher-profile',
  courseDetails: '(student)/course-details',
} as const;
