import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Star, FolderOpen } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Screens } from '@/src/constants/Routes';

interface InstructorProps {
  name: string;
  title: string;
  imageLink: string;
  feild: string;
  students: number;
  courseNumber: number;
  rating?: number;
  isActivated?: boolean;
}

export const InstructorCard = ({
  name,
  title,
  students,
  rating,
  imageLink,
  feild,
}: InstructorProps) => {
  return (
    <Link href={Screens.teacherProfile}>
      <View className="mb-6 rounded-xl border border-border bg-card p-4">
        <View className="mb-3 flex-row items-start justify-between">
          <View className="flex-row items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage source={{ uri: imageLink }} />
              <AvatarFallback>ص</AvatarFallback>
            </Avatar>
            <View>
              <Text className="text-right font-bold text-text">{name}</Text>
              <Text className="text-right text-xs text-textInactive">{title}</Text>
            </View>
          </View>
          <Badge variant="outline" className="border-primary/20 bg-primary/10">
            <Text className="text-xs text-primary">{feild}</Text>
          </Badge>
        </View>

        <View className="mb-4 flex-row justify-end gap-4">
          <View className="flex-row items-center gap-1">
            <Text className="text-xs text-textInactive">{students} طالب</Text>
            <Star size={12} color="hsl(var(--warning))" fill="hsl(var(--warning))" />
            <Text className="text-xs text-textInactive">{rating}</Text>
          </View>
        </View>
        <Link href={Screens.teacherProfile}>
          <Button variant="secondary" className="w-full flex-row gap-2">
            <FolderOpen size={16} color="hsl(var(--text))" />
            <Text className="font-bold text-text">عرض الملف الأكاديمي</Text>
          </Button>
        </Link>
      </View>
    </Link>
  );
};
