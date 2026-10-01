import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { GraduationCap } from 'lucide-react-native';

export const HeroSection = () => {
  return (
    <View className="mb-6 rounded-xl bg-card p-4">
      <View className="mb-4 items-center">
        <Badge variant="secondary" className="mb-2 flex-row gap-1">
          <GraduationCap size={12} color="hsl(var(--text))" />
          <Text variant="muted" className="text-xs text-text">
            مؤسسة مشكاة للتعليم الاكاديمى
          </Text>
        </Badge>
      </View>

      <View className="flex-row items-center gap-4">
        <View className="flex-1">
          <Text variant="h1" className="mb-2 leading-8 text-text">
            تعلّم من نخبة العقول الأكاديمية وصناع المستقبل
          </Text>
          <Text variant="h3" className="text-sm leading-5 text-textInactive">
            إشراف نخبة من الخبراء، مسارات عملية، ومحتوى يواكب أحدث التطورات.
          </Text>
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop',
          }}
          className="h-24 w-24 rounded-lg"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};
