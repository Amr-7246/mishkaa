import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Check } from 'lucide-react-native';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const Stepper = ({ currentStep, totalSteps, steps }: StepperProps) => {
  return (
    <View className="mb-6">
      <View className="mb-2 flex-row items-center justify-between px-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <View key={index} className="flex-1 items-center">
              <View
                className={`mb-1 h-8 w-8 items-center justify-center rounded-full ${isActive ? 'bg-primary' : isCompleted ? 'bg-success' : 'bg-muted'}`}>
                {isCompleted ? (
                  <Check size={16} color="white" />
                ) : (
                  <Text
                    className={`text-xs font-bold ${isActive ? 'text-primary-foreground' : 'text-textInactive'}`}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                className={`text-center text-[10px] ${isActive ? 'font-bold text-primary' : 'text-textInactive'}`}>
                {step}
              </Text>
            </View>
          );
        })}
      </View>
      {/* Progress Bar */}
      <View className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
        <View
          className="h-full bg-primary"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </View>
    </View>
  );
};
