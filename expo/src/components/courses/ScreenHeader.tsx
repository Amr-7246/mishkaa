import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const ScreenHeader = ({ title, subtitle, rightAction }: ScreenHeaderProps) => {
  const router = useRouter();
  return (
    <View className="sticky top-0 z-40 flex-row items-center justify-between border-b border-border bg-background/95 px-5 py-4">
      <View className="flex-row gap-2">{rightAction}</View>
      <View className="flex-1 items-end">
        <Text className="text-right text-base font-bold text-text">{title}</Text>
        {subtitle && <Text className="text-right text-xs text-textInactive">{subtitle}</Text>}
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        className="mr-3 h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
        <ArrowRight size={20} color="hsl(var(--text))" />
      </TouchableOpacity>
    </View>
  );
};
