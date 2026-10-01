import { Routes } from '@/src/constants/Routes';
import { useGet } from '@/src/hooks/api/useBaseCrud';
import { UseQueryResult } from '@tanstack/react-query';

export class TeacherCoursePreviewDto {
  id!: string;
  title!: string;
  description!: string;
  grade?: number;
  subject?: string;
  price!: number;
  isFree!: boolean;
  thumbnailUrl!: string;
  durationSeconds!: number;
  totalLessons!: number;
  difficultyLevel!: string;
  ratingAvg!: number;
  ratingCount!: number;
  enrollmentCount!: number;
  isPinned!: boolean;
  createdAt!: Date;
}

export class TeacherWithCoursesDto {
  id!: string;
  fullName!: string;
  avatarUrl?: string;
  bio?: string;
  ratingAvg!: number;
  ratingCount!: number;
  verifiedBadge!: boolean;
  totalStudents!: number;
  totalCourses!: number;
  courses!: TeacherCoursePreviewDto[];
  specialties?: string[];
  experienceYears?: number;
  education?: string;
}

export class TeacherListingResDto {
  data!: TeacherWithCoursesDto[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}

export const useHomeList = (): UseQueryResult<TeacherListingResDto> => {
  return useGet(['homeList'], Routes.homeList, 100 * 60 * 5);
};
