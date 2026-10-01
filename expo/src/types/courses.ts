//& Shared Types
export type LessonState = 'completed' | 'current' | 'not_started' | 'locked';
export type ModuleState = 'in_progress' | 'completed' | 'locked';

//& Screen 1: Course Overview
export interface CourseOverview {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  progressPercentage: number;
  status: string;
  instructor: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  stats: {
    completedLessons: string;
    completedQuizzes: number;
    watchTime: string;
  };
  modulesPreview: {
    id: string;
    number: string;
    title: string;
    lessonCount: number;
    duration: string;
    state: ModuleState;
    progressPercentage: number;
    completedLessons: number;
    totalLessons: number;
  }[];
}

//& Screen 2: Curriculum
export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz';
  state: LessonState;
  lockReason?: string;
}

export interface CurriculumModule {
  id: string;
  number: number;
  title: string;
  completedLessons: number;
  totalLessons: number;
  isExpanded: boolean;
  lessons: CurriculumLesson[];
}

export interface CourseCurriculum {
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  remainingTime: string;
  modules: CurriculumModule[];
  nextLesson: {
    id: string;
    title: string;
  };
}

//& Screen 3: Lesson Player
export interface LessonResource {
  id: string;
  title: string;
  size: string;
  pages: string;
  fileUrl: string;
  type: 'pdf' | 'doc' | 'zip';
}

export interface LessonPayload {
  id: string;
  title: string;
  moduleTitle: string;
  videoUrl: string;
  durationSeconds: number;
  summary: string;
  learningObjectives: string[];
  resources: LessonResource[];
  quizGate?: {
    id: string;
    title: string;
    questionCount: number;
    passingScore: number;
    estimatedTime: string;
  };
  navigation: {
    previousLessonId: string | null;
    nextLessonId: string | null;
    isNextLocked: boolean;
  };
}

//& Screen 4: Quiz
export interface QuizOption {
  id: string;
  text: string;
  label?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false';
  points: number;
  difficulty: string;
  suggestedTime: string;
  options: QuizOption[];
}

export interface QuizPayload {
  id: string;
  courseTitle: string;
  title: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  progressPercentage: number;
  currentQuestion: QuizQuestion;
  feedback?: {
    isCorrect: boolean;
    message: string;
    explanation: string;
  };
}
