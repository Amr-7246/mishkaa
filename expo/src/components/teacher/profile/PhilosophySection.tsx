import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { BookOpen, Play } from 'lucide-react-native';
import { TeacherProfileData } from '@/src/api/features/teacher/teacher';

export const PhilosophySection = ({ data }: { data: TeacherProfileData }) => {
  return (
    <View className="mb-4 rounded-2xl border border-border bg-card p-5">
      <View className="mb-3 flex-row items-center justify-between">
        <Badge variant="outline" className="border-border bg-muted">
          <Text className="text-xs text-primary">المنهجية...</Text>
        </Badge>
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-bold text-text">فلسفة التدريس</Text>
          <BookOpen size={20} color="hsl(var(--primary))" />
        </View>
      </View>

      <Text className="mb-4 text-right text-sm leading-relaxed text-textInactive">
        {data.philosophy}
      </Text>

      {/* Video Thumbnail */}
      <TouchableOpacity className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-border">
        <Image source={{ uri: data.introVideoThumbnail }} className="h-full w-full opacity-80" />
        <View className="absolute inset-0 flex-col justify-between bg-black/40 p-4">
          <Badge className="self-start bg-card/90">
            <Text className="text-xs text-primary">جولة سريعة...</Text>
          </Badge>
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-primary">
              <Play
                size={24}
                color="hsl(var(--primary-foreground))"
                fill="hsl(var(--primary-foreground))"
              />
            </View>
            <View>
              <Text className="text-base font-bold text-white">الأستوديو الهندسي...</Text>
              <Text className="mt-0.5 text-xs text-textInactive">معاينة المنظومة...</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Social Links */}
      <View className="flex-row flex-wrap items-center gap-2">
        <Text className="text-xs font-bold text-text">إشارات ومشاركات:</Text>
        {data.socialLinks.map((link) => (
          <Badge key={link.id} variant="secondary" className="border-border bg-muted">
            <Text className="text-xs text-textInactive">{link.label}</Text>
          </Badge>
        ))}
      </View>
    </View>
  );
};
