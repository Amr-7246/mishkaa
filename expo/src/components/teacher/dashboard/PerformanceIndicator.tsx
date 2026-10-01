import { View } from 'react-native';
import React from 'react';
import { Text } from '../../ui/text';
import { StatsCard } from './StatsCard';
import { DollarSign, StarPlus, Target, Users } from 'lucide-react-native';
import { CartesianChart, Line } from 'victory-native';

interface Propes {
  revenue?: {
    chartData: { x: any; y: number }[];
    thisMonth: number;
    lastMonth: number;
    ration: number;
  };
  students?: {
    totalStudents: number;
    newStudents: number;
  };
  completionRate?: {
    ratio: number;
  };
  npsScore?: {
    score: number;
    students: number;
  };
}

const PerformanceIndicator = ({ revenue, students, completionRate, npsScore }: Propes) => {
  const npsBadge = (nps: number) => {
    const list = {
      bad: {
        badge: 'يحتاج الى تحسين',
        color: 'hsl(var(--warning))',
      },
      good: {
        badge: 'جيد',
        color: 'hsl(var(--info))',
      },
      veryGood: {
        badge: 'جيد جدا',
        color: 'hsl(var(--info))',
      },
      exlante: {
        badge: 'ممتاز',
        color: 'hsl(var(--success))',
      },
    };
    if (nps < 50) {
      return list.bad;
    }
    if (nps > 50 && nps < 70) {
      return list.good;
    }
    if (nps > 50 && nps < 80) {
      return list.veryGood;
    }
    if (nps > 50 && nps < 100) {
      return list.exlante;
    }
    return list.good;
  };
  return (
    <View>
      {/* topper: header with bage */}
      <View>
        <Text variant="h2">مؤشرات الأداء التنفيذي</Text>
        <Badge>بيانات لحظية</Badge>
      </View>

      <View>
        {revenue && students && completionRate && npsScore ? (
          <>
            {/* // Revenue Card with Chart */}
            <StatsCard
              title={`إجمالي الإيرادات ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              value={`$${revenue.thisMonth.toLocaleString()}`}
              badge={revenue.ration}
              subtext={`مقارنة بـ ${revenue.lastMonth} خلال 30 يوماً الماضية`}
              icon={<DollarSign size={20} color="hsl(var(--primary))" />}>
              <View className="h-24 w-full">
                <CartesianChart
                  data={revenue.chartData}
                  xKey="x"
                  yKeys={['y']}
                  axisOptions={{
                    font: null,
                    tickCount: { x: 0, y: 0 },
                    lineColor: 'transparent',
                  }}>
                  {({ points }) => (
                    <Line
                      points={points.y}
                      color={'hsl(var(--primary))'}
                      strokeWidth={3}
                      curveType="natureal"
                    />
                  )}
                </CartesianChart>
              </View>
            </StatsCard>
            {/* // Two Column Stats  */}
            <View className="mb-4 flex-row gap-4">
              <StatsCard
                className="flex-1"
                title={`عدد الطلاب`}
                value={students.totalStudents}
                subtext={`↑ ${students.newStudents} طالب جديد`}
                icon={<Users size={24} color="hsl(var(--info))" />}
              />

              <StatsCard
                className="flex-1"
                title={`نسبة الإتمام`}
                value={`${completionRate.ratio} %`}
                subtext="نسبة اتمام الطالب للكورسات"
                icon={<Target size={24} color="hsl(var(--secondery))" />}
              />
            </View>
            {/* NPS Score (rating) */}
            <StatsCard
              className="flex-1"
              title="مؤشر رضا الطلاب (NPS)"
              value={`${npsScore.score}/100`}
              badge={npsBadge(npsScore.score).badge}
              subtext={` بنائا على تقييم  ${npsScore.students}  `}
              icon={<StarPlus size={24} color="hsl(var(--success))" />}
            />
          </>
        ) : (
          <Text variant={'large'}>لا توجد بيانات بعد</Text>
        )}
      </View>
    </View>
  );
};

export default PerformanceIndicator;
