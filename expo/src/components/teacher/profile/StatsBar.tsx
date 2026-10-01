import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Star } from 'lucide-react-native';
import { TeacherStats } from '@/src/api/features/teacher/teacher';

export const StatsBar = ({ stats }: { stats: TeacherStats }) => {
  return (
    <View className="mb-4 flex-row justify-between py-3">
      <View className="flex-1 items-center">
        <Text className="text-2xl font-bold text-text">{stats.students}</Text>
        <Text className="mt-1 text-xs text-textInactive">طالب نشط</Text>
      </View>
      <View className="flex-1 items-center border-x border-border">
        <View className="flex-row items-center gap-1">
          <Star size={20} color="hsl(var(--primary))" fill="hsl(var(--primary))" />
          <Text className="text-2xl font-bold text-text">{stats.rating}/5</Text>
        </View>
        <Text className="mt-1 text-xs text-textInactive">{stats.reviews} تقييم</Text>
      </View>
      <View className="flex-1 items-center">
        <Text className="text-2xl font-bold text-text">{stats.experience}</Text>
        <Text className="mt-1 text-xs text-textInactive">خبرة تخصصية</Text>
      </View>
    </View>
  );
};
