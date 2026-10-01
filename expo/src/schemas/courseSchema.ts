import { z } from 'zod';

// Enums matching your DTOs
export const AssetTypeEnum = z.enum(['document', 'image', 'video', 'audio', 'other']);
export const QuestionTypeEnum = z.enum([
  'multiple_choice',
  'true_false',
  'short_answer',
  'long_answer',
]);
export const LessonTypeEnum = z.enum(['video', 'quiz', 'assignment', 'reading', 'mixed']);

// 1. Quiz Question Schema
export const QuizQuestionSchema = z.object({
  question: z.string().min(1, 'Question text is required'),
  type: QuestionTypeEnum,
  options: z.array(z.string()).min(2, 'At least 2 options required'),
  correctAnswers: z.array(z.number()),
  points: z.number().default(1),
  explanation: z.string().optional(),
});

// 2. Quiz Schema
export const QuizSchema = z.object({
  title: z.string().min(1, 'Quiz title required'),
  description: z.string().optional(),
  passingScore: z.number().min(0).max(100).default(70),
  timeLimitMinutes: z.number().optional(),
  isRequired: z.boolean().default(true),
  attemptsAllowed: z.number().default(3),
  questions: z.array(QuizQuestionSchema).min(1, 'At least one question required'),
});

// 3. Lesson Asset Schema
export const LessonAssetSchema = z.object({
  type: AssetTypeEnum,
  title: z.string().min(1, 'Asset title required'),
  fileUrl: z.string().url('Invalid file URL'),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
  isDownloadable: z.boolean().default(true),
});

// 4. Lesson Schema (This is complex, we'll make video/quiz optional based on type)
export const LessonSchema = z.object({
  title: z.string().min(1, 'Lesson title required'),
  description: z.string().optional(),
  type: LessonTypeEnum,
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  durationSeconds: z.number().optional(),
  orderIndex: z.number().optional(),
  isFreePreview: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  assets: z.array(LessonAssetSchema).optional(),
  quizzes: z.array(QuizSchema).optional(),
});

// 5. Module Schema
export const ModuleSchema = z.object({
  title: z.string().min(1, 'Module title required'),
  description: z.string().optional(),
  orderIndex: z.number().optional(),
  isPublished: z.boolean().default(false),
  // Note: Lessons are usually managed separately in the UI, but we allow them here per DTO
  lessons: z.array(LessonSchema).optional(),
});

// 6. Main Create Course Schema
export const CreateCourseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  price: z.number().min(0).default(0),
  isFree: z.boolean().default(false),
  courseIntroUrl: z.string().optional(),
  previewUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  durationSeconds: z.number().optional(),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  tags: z.array(z.string()).max(10).optional(),
  requirements: z.array(z.string()).max(10).optional(),
  whatYouWillLearn: z.array(z.string()).max(10).optional(),
  targetAudience: z.array(z.string()).max(10).optional(),
  categoryId: z.string().optional(),
  gradeSubjectId: z.string().min(1, 'Grade Subject is required'),

  // Structural
  modules: z.array(ModuleSchema).optional(),
});

export type CreateCourseFormData = z.infer<typeof CreateCourseSchema>;
