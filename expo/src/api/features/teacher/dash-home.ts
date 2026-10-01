import { useGet } from '@/src/hooks/api/useBaseCrud';
import { UseQueryResult } from '@tanstack/react-query';

interface DashHomeResDto {
  basic: {
    userName: string;
    avatar: string;
    title: string;
    termCursor: string;
  };
  performance: {
    revenue: {
      chartData: { x: any; y: number }[];
      thisMonth: number;
      lastMonth: number;
      ration: number;
    };
    students: {
      totalStudents: number;
      newStudents: number;
    };
    completionRate: {
      ratio: number;
    };
    npsScore: {
      score: number;
      students: number;
    };
  };
  hotStates: {
    urgentRequests: {
      name: string;
      role: string;
      message: string;
      status: string;
      date: string;
    }[];

    lastSupscriptions: {
      name: string;
      courseName: string;
      price: string;
      date: string;
    }[];
  };
}

export const useDashHome = (): UseQueryResult<DashHomeResDto> => {
  return useGet(['dashHome'], '', 100 * 60 * 5);
};
