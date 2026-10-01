import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';

export const RequirementsCard = ({ requirements }: { requirements: string[] }) => {
  return (
    <View className="mb-5 rounded-2xl border border-border bg-card p-4">
      <View className="mb-3 flex-row items-center gap-2">
        <Text className="font-bold text-text">المتطلبات السابقة للالتحاق</Text>
        <View className="h-4 w-1.5 rounded-full bg-primary" />
      </View>
      <View className="gap-2">
        {requirements.map((req, index) => (
          <View key={index} className="flex-row items-center gap-2">
            <View className="h-1.5 w-1.5 rounded-full bg-primary" />
            <Text className="flex-1 text-right text-sm text-textInactive">{req}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
