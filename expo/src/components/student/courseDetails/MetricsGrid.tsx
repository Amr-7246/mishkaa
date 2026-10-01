import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Clock, Terminal, HelpCircle, Award } from 'lucide-react-native';
import { CourseMetric } from '@/src/api/features/student/course';

// Helper to map string icon names to Lucide components
const IconMapper = ({ name, size, color }: { name: string; size: number; color: string }) => {
  switch (name) {
    case 'clock':
      return <Clock size={size} color={color} />;
    case 'terminal':
      return <Terminal size={size} color={color} />;
    case 'quiz':
      return <HelpCircle size={size} color={color} />;
    case 'award':
      return <Award size={size} color={color} />;
    default:
      return <Clock size={size} color={color} />;
  }
};

export const MetricsGrid = ({ metrics }: { metrics: CourseMetric[] }) => {
  return (
    <View className="mb-5 flex-row flex-wrap gap-2.5">
      {metrics.map((metric) => (
        <View
          key={metric.id}
          className="w-[48%] flex-row items-center gap-3 rounded-xl border border-border bg-card p-3.5">
          <View className="h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
            <IconMapper name={metric.icon} size={18} color="hsl(var(--primary))" />
          </View>
          <View className="flex-1">
            <Text className="text-[10px] text-textInactive">{metric.label}</Text>
            <Text className="text-xs font-bold text-text">{metric.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
