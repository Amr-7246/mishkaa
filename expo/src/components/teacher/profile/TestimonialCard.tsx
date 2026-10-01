import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Quote } from 'lucide-react-native';
import { Testimonial } from '@/src/api/features/teacher/teacher';

export const TestimonialCard = ({ data }: { data: Testimonial }) => {
  return (
    <View className="mb-4 rounded-2xl border border-border bg-card p-5">
      <View className="mb-2 flex-row items-center gap-1.5">
        <Quote size={18} color="hsl(var(--primary))" fill="hsl(var(--primary))" />
        <Text className="text-xs font-bold uppercase tracking-wider text-primary">
          شهادات الخريجين...
        </Text>
      </View>

      <Text className="mb-4 text-sm italic leading-relaxed text-text">{data.quote}</Text>

      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: data.avatar }}
          className="h-10 w-10 rounded-full border border-border"
        />
        <View>
          <Text className="text-sm font-bold text-text">{data.author}</Text>
          <Text className="text-xs text-textInactive">{data.role}</Text>
        </View>
      </View>
    </View>
  );
};
