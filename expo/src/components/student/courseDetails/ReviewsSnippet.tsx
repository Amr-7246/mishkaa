import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Star } from 'lucide-react-native';
import { Review } from '@/src/api/features/student/course';

export const ReviewsSnippet = ({ reviews }: { reviews: Review[] }) => {
  return (
    <View className="mb-5 rounded-2xl border border-border bg-card p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Pressable>
          <Text className="text-xs text-primary">عرض المزيد...</Text>
        </Pressable>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm font-bold text-text">آراء المهندسين والباحثين</Text>
          <View className="flex-row">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} color="hsl(var(--warning))" fill="hsl(var(--warning))" />
            ))}
          </View>
        </View>
      </View>

      {reviews.map((review) => (
        <View key={review.id} className="mb-2 rounded-xl border border-border/50 bg-background p-3">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-[10px] text-textInactive">{review.timeAgo}</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-xs font-semibold text-text">{review.author}</Text>
              <View className="h-7 w-7 items-center justify-center rounded-full bg-muted">
                <Text className="text-xs font-bold text-primary">{review.avatarInitial}</Text>
              </View>
            </View>
          </View>
          <Text className="text-right text-sm leading-relaxed text-textInactive">
            {review.text}
          </Text>
        </View>
      ))}
    </View>
  );
};
