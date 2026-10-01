import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { MapPin, Code, Star, CalendarPlus, UserPlus, BadgeCheck } from 'lucide-react-native';
import { TeacherProfileData } from '@/src/api/features/teacher/teacher';

export const ProfileHero = ({ data }: { data: TeacherProfileData }) => {
  return (
    <View className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-card p-5">
      {/* Top Section: Avatar & Info */}
      <View className="mb-4 flex-col items-center gap-4">
        <View className="relative">
          <Image
            source={{ uri: data.avatar }}
            className="h-24 w-24 rounded-full border-2 border-border"
          />
          {data.isVerified && (
            <View className="absolute bottom-0 left-0 h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary">
              <BadgeCheck size={16} color="hsl(var(--primary-foreground))" />
            </View>
          )}
        </View>

        <View className="items-center">
          <Badge variant="outline" className="mb-2 flex-row gap-1 border-border bg-muted/50">
            <Star size={12} color="hsl(var(--primary))" fill="hsl(var(--primary))" />
            <Text className="text-xs text-primary">{data.title}</Text>
          </Badge>
          <Text className="text-2xl font-bold text-text">{data.name}</Text>
          <Text className="mt-1 max-w-[300px] text-center text-sm text-textInactive">
            {data.bio}
          </Text>
        </View>

        {/* Badges */}
        <View className="mt-2 flex-row flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="flex-row gap-1 border-border bg-muted">
            <MapPin size={12} color="hsl(var(--primary))" />
            <Text className="text-xs text-textInactive">{data.location}</Text>
          </Badge>
          <Badge variant="secondary" className="flex-row gap-1 border-border bg-muted">
            <Code size={12} color="hsl(var(--primary))" />
            <Text className="text-xs text-textInactive">{data.specialty}</Text>
          </Badge>
          {data.badges.map((badge, i) => (
            <Badge
              key={i}
              variant="outline"
              className="flex-row gap-1 border-primary/30 bg-primary/10">
              <Star size={12} color="hsl(var(--primary))" fill="hsl(var(--primary))" />
              <Text className="text-xs text-primary">{badge}</Text>
            </Badge>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3 border-t border-border pt-4">
        <Button className="flex-1 flex-row gap-2 bg-primary">
          <CalendarPlus size={18} color="hsl(var(--primary-foreground))" />
          <Text className="font-bold text-primary-foreground">احجز استشارة...</Text>
        </Button>
        <Button variant="outline" className="border-border px-3">
          <UserPlus size={20} color="hsl(var(--text))" />
        </Button>
      </View>
    </View>
  );
};
