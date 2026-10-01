import React from 'react';
import { View, ScrollView } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Text } from '@/src/components/ui/text';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { CreateCourseFormData } from '@/src/schemas/courseSchema';

export const Step1BasicInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateCourseFormData>();

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="mb-4 text-right text-lg font-bold text-text">هوية الدورة التعليمية</Text>

      <View className="mb-4">
        <Text className="mb-1 text-right text-sm text-textInactive">عنوان الدورة *</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="مثال: أساسيات الحوسبة السحابية"
              value={value}
              onChangeText={onChange}
              className="text-right"
            />
          )}
        />
        {errors.title && <Text className="mt-1 text-xs text-error">{errors.title.message}</Text>}
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-right text-sm text-textInactive">وصف الدورة *</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="اكتب وصفاً موجزاً للدورة..."
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              className="h-24 text-right"
            />
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-right text-sm text-textInactive">مستوى الصعوبة</Text>
        <Controller
          control={control}
          name="difficultyLevel"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row justify-end gap-2">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <Button
                  key={level}
                  variant={value === level ? 'default' : 'outline'}
                  onPress={() => onChange(level)}
                  className="flex-1">
                  <Text>
                    {level === 'beginner' ? 'مبتدئ' : level === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </Text>
                </Button>
              ))}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
