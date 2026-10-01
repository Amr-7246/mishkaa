import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { Play, Clock, Star } from 'lucide-react-native';
import { CourseDetailsData } from '@/src/api/features/student/course';

export const CourseHero = ({ data }: { data: CourseDetailsData }) => {
  return (
    <View className="mb-5">
      {/* Video Thumbnail */}
      <View className="relative mb-4 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card">
        <Image source={{ uri: data.videoThumbnail }} className="h-full w-full opacity-80" />
        <View className="absolute inset-0 bg-black/40" />

        {/* Play Button */}
        <View className="absolute inset-0 items-center justify-center">
          <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
            <Play
              size={28}
              color="hsl(var(--primary-foreground))"
              fill="hsl(var(--primary-foreground))"
            />
          </TouchableOpacity>
        </View>

        {/* Top Badge */}
        <View className="absolute right-3 top-3">
          <Badge className="flex-row gap-1 border-primary/30 bg-background/80">
            <Play size={12} color="hsl(var(--primary))" />
            <Text className="text-[10px] text-primary">معاينة مجانية...</Text>
          </Badge>
        </View>

        {/* Bottom Badge */}
        <View className="absolute bottom-3 left-3">
          <Badge className="flex-row gap-1 border-border bg-background/80">
            <Clock size={12} color="hsl(var(--text))" />
            <Text className="text-[10px] text-text">18 ساعة تدريبية</Text>
          </Badge>
        </View>
      </View>

      {/* Meta Badges */}
      <View className="mb-3 flex-row flex-wrap gap-2">
        <Badge variant="secondary" className="flex-row gap-1 border-border bg-muted">
          <Star size={12} color="hsl(var(--warning))" fill="hsl(var(--warning))" />
          <Text className="text-[10px] text-text">
            {data.rating} من {data.reviewCount} تقييم
          </Text>
        </Badge>
        <Badge variant="secondary" className="border-border bg-muted">
          <Text className="text-[10px] text-text">{data.level}</Text>
        </Badge>
        <Badge variant="outline" className="flex-row gap-1 border-border bg-card">
          <Clock size={12} color="hsl(var(--text-inactive))" />
          <Text className="text-[10px] text-textInactive">{data.lastUpdated}</Text>
        </Badge>
      </View>

      {/* Title & Description */}
      <Text className="mb-2 text-2xl font-extrabold leading-tight text-text">{data.title}</Text>
      <Text className="text-sm leading-relaxed text-textInactive">{data.description}</Text>
    </View>
  );
};
