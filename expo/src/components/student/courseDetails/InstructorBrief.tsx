import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { BadgeCheck } from 'lucide-react-native';
import { CourseDetailsData } from '@/src/api/features/student/course';

export const InstructorBrief = ({
  instructor,
}: {
  instructor: CourseDetailsData['instructor'];
}) => {
  return (
    <View className="mb-5 flex-row items-center justify-between rounded-xl border border-border bg-card p-3.5">
      <View className="flex-1 flex-row items-center gap-3">
        <Image
          source={{ uri: instructor.avatar }}
          className="h-12 w-12 rounded-full border border-primary/40"
        />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm font-bold text-text">{instructor.name}</Text>
            {instructor.isVerified && <BadgeCheck size={14} color="hsl(var(--primary))" />}
          </View>
          <Text className="mt-0.5 text-xs text-textInactive" numberOfLines={1}>
            {instructor.title}
          </Text>
        </View>
      </View>
      <TouchableOpacity className="rounded-full border border-border px-3 py-1.5">
        <Text className="text-xs text-primary">عرض الملف...</Text>
      </TouchableOpacity>
    </View>
  );
};
