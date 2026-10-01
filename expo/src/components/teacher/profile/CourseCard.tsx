import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Star, Signal, Clock, BookOpen, ArrowLeft } from 'lucide-react-native';
import { Course } from '@/src/api/features/teacher/teacher';

export const CourseCard = ({ course }: { course: Course }) => {
  return (
    <View className="mb-4 rounded-2xl border border-border bg-card p-5">
      <Badge variant="secondary" className="mb-2 self-start border-border bg-muted">
        <Text className="text-xs font-bold text-primary">{course.badge}</Text>
      </Badge>

      <Text className="mb-1 text-base font-bold text-text">{course.title}</Text>
      <Text className="mb-3 text-xs text-textInactive">{course.description}</Text>

      {/* Meta Stats */}
      <View className="mb-4 flex-row flex-wrap items-center gap-3">
        <View className="flex-row items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5">
          <Star size={15} color="hsl(var(--primary))" fill="hsl(var(--primary))" />
          <Text className="text-xs font-bold text-text">{course.rating}</Text>
          <Text className="text-[11px] text-textInactive">{course.reviews}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Signal size={15} color="hsl(var(--primary))" />
          <Text className="text-xs text-textInactive">{course.level}...</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Clock size={15} color="hsl(var(--primary))" />
          <Text className="text-xs text-textInactive">{course.duration}</Text>
        </View>
      </View>

      {/* Last Module */}
      <View className="mb-4 flex-row items-center justify-between rounded-xl border border-border bg-background p-3">
        <View className="flex-1 flex-row items-center gap-2">
          <BookOpen size={18} color="hsl(var(--primary))" />
          <Text className="flex-1 truncate text-xs text-textInactive">{course.lastModule}</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-xs font-bold text-primary">استعراض...</Text>
        </TouchableOpacity>
      </View>

      {/* Pricing & Action */}
      <View className="flex-row items-center justify-between border-t border-border pt-3.5">
        <View>
          <Text className="text-xs text-textInactive">رسوم الانضمام</Text>
          <Text className="text-xl font-bold text-text">${course.price}</Text>
        </View>
        <Button className="flex-row gap-1.5 bg-primary">
          <ArrowLeft size={16} color="hsl(var(--primary-foreground))" />
          <Text className="text-xs font-bold text-primary-foreground">سجل الآن...</Text>
        </Button>
      </View>
    </View>
  );
};
