import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { Link } from 'expo-router';
import { Screens } from '@/src/constants/Routes';

interface CourseProps {
  title: string;
  thumbnail: string;
  duration: string;
  price: number;
  isActive: boolean;
}

export const CourseCard = ({ title, thumbnail, duration, price, isActive }: CourseProps) => {
  return (
    <Link href={Screens.courseDetails}>
      <View className="mr-4 w-48 overflow-hidden rounded-xl border border-border bg-card">
        <View className="relative">
          <Image source={{ uri: thumbnail }} className="h-24 w-full" resizeMode="cover" />
          <Badge className={`absolute right-2 top-2 ${isActive ? 'bg-primary' : 'bg-destructive'}`}>
            <Text className="text-[10px] text-white">{isActive ? 'متاح' : 'انطلق'}</Text>
          </Badge>
        </View>

        <View className="p-3">
          <Text className="mb-2 h-10 text-right font-bold text-text" numberOfLines={2}>
            {title}
          </Text>

          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-xs text-textInactive">{duration}</Text>
          </View>

          <View className="flex-row items-center justify-between border-t border-border pt-2">
            <Text className="font-bold text-text">{price} جنيه</Text>
          </View>
        </View>
      </View>
    </Link>
  );
};
