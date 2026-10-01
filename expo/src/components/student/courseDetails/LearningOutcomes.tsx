import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { CheckCircle2 } from 'lucide-react-native';
import { LearningOutcome } from '@/src/api/features/student/course';

export const LearningOutcomes = ({ outcomes }: { outcomes: LearningOutcome[] }) => {
  return (
    <View className="mb-5 rounded-2xl border border-border bg-card p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xs text-primary">{outcomes.length} مهارات رئيسية</Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-text">مخرجات التعلم المستهدفة</Text>
          <View className="h-4 w-1.5 rounded-full bg-primary" />
        </View>
      </View>

      <View className="gap-2.5">
        {outcomes.map((outcome) => (
          <View
            key={outcome.id}
            className="flex-row items-start gap-2.5 rounded-xl border border-border/50 bg-background p-3">
            <CheckCircle2
              size={18}
              color="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              className="mt-0.5"
            />
            <Text className="flex-1 text-right text-sm text-text">{outcome.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
